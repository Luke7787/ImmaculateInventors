export interface FolderProps {
	name: string;
	userId: string;
	imageUrl: string;
	items: string[];
	id: string;
}

export interface ItemProps {
	name: string;
    userId?: string;
	quantity: number;
	imageUrl: string;
	id: string;
	note?: string;
    date?: Date;
    folder: string;
}