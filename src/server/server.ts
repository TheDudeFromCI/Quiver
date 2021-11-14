import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { URL } from 'url';
import fs from 'fs/promises';

type MIME_TYPE = { type: string, binary: boolean; }
const MIMES: Record<string, MIME_TYPE> = {
    html: { type: 'text/html', binary: false },
    css: { type: 'text/css', binary: false },
    js: { type: 'text/javascript', binary: false },
    png: { type: 'image/png', binary: true }
};

/**
 * Manages an active webserver instance to channel html elements to web clients.
 */
export class WebServer
{
    public readonly port: number;

    private readonly server: Server;

    /**
     * Creates and opens a new web server instance on the given port.
     * @param port - The port to start the webserver on.
     */
    constructor(port: number)
    {
        this.port = port;
        this.server = createServer(this.handleRequest);
    }

    /**
     * Called each time the web server recieves a request. This function
     * handles and responds to the request.
     * @param req - The incoming request.
     * @param res - The server's response.
     */
    private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void>
    {
        console.log(`Handling request for ${req.url}`);

        const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
        let pathname = url.pathname;
        if (pathname == '/') pathname = '/index.html';

        const fileType = pathname.split('.').pop()?.toLowerCase() ?? "html";
        const mime = MIMES[fileType];
        const filePath = process.cwd() + "/public" + pathname;

        try
        {
            const data: Buffer = await fs.readFile(filePath);
            console.log(`Returning ${filePath}`);

            res.writeHead(200, { 'Content-Type': mime.type });
            res.write(data, mime.binary ? 'binary' : 'utf8');
            res.end();
        }
        catch (err: any)
        {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Page not found!');
            res.end();

            console.log(`File '${filePath}' not found!`);
        }
    }

    /**
     * Starts the server if it is not already started. If it is already started, this
     * function will throw an error.
     */
    async start(): Promise<void>
    {
        await new Promise((resolve, reject) =>
        {
            this.server.listen(this.port, (err?: Error) =>
            {
                if (err != null) reject(err);
                else resolve(null)
            });
        });

        console.log(`Started server on port: ${this.port}`);
    }

    /**
     * Closes the active web server connection if a connection is open. If no
     * connection is open, this function does nothing.
     */
    close(): void
    {
        this.server.close();
    }
}
