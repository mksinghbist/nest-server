export class Room {
    Id: number;
    Type: string;
    Name: string;
    Area: string;
    Number: number;

    constructor(id: number, type: string, name: string, area: string, number: number) {
        this.Id = id;
        this.Type = type;
        this.Name = name;
        this.Area = area;
        this.Number = number;
    }
}
