export interface Actor {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
    known_for_department: string;
}

export interface Credits {
    id: number;
    cast: Actor[];
}
