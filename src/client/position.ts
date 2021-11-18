export class Position
{
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    distance(pos: Position | number, _y?: number): number
    {
        const x: number = (pos as Position)?.x ?? pos;
        const y: number = (pos as Position)?.y ?? _y;

        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    lerpTo(pos: Position, t: number): void
    {
        if (t <= 0) t = 0;
        if (t >= 1) t = 1;
        this.x = this.x * (1 - t) + pos.x * t;
        this.y = this.y * (1 - t) + pos.y * t;
    }

    set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }
}

export class Bounds
{
    public readonly min: Position = new Position();
    public readonly max: Position = new Position();

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        this.set(x, y, width, height);
    }

    set(x: number, y: number, width: number, height: number): void
    {
        this.min.set(x, y);
        this.max.set(x + width, y + height);
    }

    setBetween(a: Position, b: Position): void
    {
        this.min.set(Math.min(a.x, b.x), Math.min(a.y, b.y));
        this.max.set(Math.max(a.x, b.x), Math.max(a.y, b.y));
    }

    get x(): number
    {
        return this.min.x;
    }

    get y(): number
    {
        return this.min.y;
    }

    get width(): number
    {
        return this.max.x - this.min.x;
    }

    get height(): number
    {
        return this.max.y - this.min.y;
    }
}