import { Plug } from "./plug";

export class NodeType
{
    public readonly name: string;
    public readonly inputs: Plug[];
    public readonly outputs: Plug[];

    constructor(name: string, inputs: Plug[] = [], outputs: Plug[] = [])
    {
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    addInput(plug: Plug): void
    {
        if (!this.inputs.includes(plug))
            this.inputs.push(plug);
    }

    addOutput(plug: Plug): void
    {
        if (!this.outputs.includes(plug))
            this.outputs.push(plug);
    }
}