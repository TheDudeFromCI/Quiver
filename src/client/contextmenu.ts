import { Camera } from "./camera";
import { Position } from "./position";
import { Theme } from "./theme";

export class ContextWindow
{
    public readonly pos: Position = new Position();
    public readonly offset: Position = new Position();
    public readonly name: string;

    private readonly camera: Camera;
    private readonly options: string[] = [];
    private readonly children: Record<string, ContextWindow> = {};
    private renderedChild?: ContextWindow;
    private selectedOption?: string;

    constructor(name: string, camera: Camera)
    {
        this.name = name;
        this.camera = camera;
    }

    get width(): number
    {
        return Theme.CONTEXT_WINDOW_WIDTH;
    }

    get height(): number
    {
        return Theme.CONTEXT_WINDOW_LINE_HEIGHT * this.options.length;
    }

    updatePosition(menuPos: Position): void
    {
        this.pos.set(menuPos.x + this.offset.x, menuPos.y + this.offset.y);

        for (let child in this.children)
            this.children[child].updatePosition(menuPos);
    }

    render(): void
    {
        const ctx = this.camera.ctx;

        ctx.fillStyle = '#000000';
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        if (this.selectedOption != null)
        {
            const selectedY = this.pos.y + this.options.indexOf(this.selectedOption) * Theme.CONTEXT_WINDOW_LINE_HEIGHT;

            ctx.fillStyle = '#333333';
            ctx.fillRect(this.pos.x, selectedY, this.width, Theme.CONTEXT_WINDOW_LINE_HEIGHT);
        }

        ctx.fillStyle = '#999999';
        ctx.font = '16px Calibri';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < this.options.length; i++)
            ctx.fillText(this.options[i], this.pos.x + 3, this.pos.y + (i + 0.5) * Theme.CONTEXT_WINDOW_LINE_HEIGHT);

        this.renderedChild?.render();
    }

    addOption(path: string[]): void
    {
        if (path.length === 1)
        {
            if (!this.options.includes(path[0]))
                this.options.push(path[0]);
            return;
        }

        if (this.children[path[0]] != null)
        {
            this.children[path[0]].addOption(path.slice(1));
            return;
        }

        const child = new ContextWindow(path[0], this.camera);
        child.offset.set(this.offset.x + this.width, this.offset.y + this.height);
        child.addOption(path.slice(1));

        this.options.push(path[0]);
        this.children[path[0]] = child;
    }

    isInBounds(pos: Position, recursive: boolean): boolean
    {
        if (pos.x >= this.pos.x && pos.x < this.pos.x + this.width
            && pos.y >= this.pos.y && pos.y < this.pos.y + this.height)
            return true;

        if (recursive)
        {
            for (let child in this.children)
            {
                if (this.children[child].isInBounds(pos, recursive))
                    return true;
            }
        }

        return false;
    }

    getOptionAt(pos: Position): string | null
    {
        if (pos.x < this.pos.x || pos.x >= this.pos.x + this.width) return null;

        let y = this.pos.y;
        for (let option of this.options)
        {
            if (pos.y >= y && pos.y < y + Theme.CONTEXT_WINDOW_LINE_HEIGHT)
                return option;

            y += Theme.CONTEXT_WINDOW_LINE_HEIGHT;
        }

        return null;
    }

    updateSelection(pos: Position, recursive: boolean): boolean
    {
        const option = this.getOptionAt(pos) ?? undefined;
        let updated = this.selectedOption != option;
        this.selectedOption = option;

        if (this.selectedOption != null)
            this.renderedChild = this.children[this.selectedOption];

        if (recursive)
            updated ||= this.renderedChild?.updateSelection(pos, recursive) ?? false;

        return updated;
    }

    closeAll(): void
    {
        this.renderedChild = undefined;
        this.selectedOption = undefined;

        for (let child in this.children)
            this.children[child].closeAll();
    }
}

export class ContextMenu
{
    public readonly pos: Position = new Position();

    private readonly camera: Camera;
    private readonly rootWindow: ContextWindow;
    private visible: boolean = false;
    private _needsRepaint: boolean = false;

    constructor(camera: Camera)
    {
        this.camera = camera;

        this.rootWindow = new ContextWindow('root', this.camera);
        this.rootWindow.offset.set(0, 0);
    }

    get isVisible(): boolean
    {
        return this.visible;
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    markRepainted(): void
    {
        this._needsRepaint = false;
    }

    render(): void
    {
        if (!this.visible) return;
        this.rootWindow.render();
    }

    openAt(pos: Position): void
    {
        if (this.visible)
            this.close();

        this.visible = true;
        this._needsRepaint = true;
        this.rootWindow.updatePosition(pos);
    }

    close(): void
    {
        if (!this.visible) return;

        this.visible = false;
        this.rootWindow.closeAll();
        this._needsRepaint = true;
    }

    addOption(option: string): void
    {
        const path = option.split('/');
        this.rootWindow.addOption(path);
        this._needsRepaint = true;
    }

    isInBounds(pos: Position): boolean
    {
        return this.rootWindow.isInBounds(pos, true);
    }

    updateSelection(pos: Position): void
    {
        const updated = this.rootWindow.updateSelection(pos, true);
        this._needsRepaint ||= updated;
    }
}