export interface authors {
    email : string;
    firstname : string;
    lastname : string;
}

export interface books{
    title : string;
    isbn : string;
    authors : Array<string>
    authorsName : Array<string>
    description : string;
}

export interface magazines{
    title : string;
    isbn : string;
    authors : Array<string>
    authorsName : Array<string>
    publishedAt : string;
}