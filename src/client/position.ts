export class Position
{
    public x: number = 0;
    public y: number = 0;

    distanceSquared(pos: Position): number
    {
        const dx = this.x - pos.x;
        const dy = this.y - pos.y;
        return dx * dx + dy * dy;
    }

    lerpTo(pos: Position, t: number): void
    {
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

    set(x: number, y: number, width: number, height: number): void
    {
        this.min.set(x, y);
        this.max.set(x + width, y + height);
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