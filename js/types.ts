type TextObject = {
    type?: string,
    language?: string,
    text?: string
}

type Url = {
    type?: string,
    url?: string
}

type SeriesSummary = {
    resourceURL?: string,
    name?: string
}

type ComicSummary = {
    resourceURL?: string,
    name?: string
}

type CharacterSummary = {
    resourceURL?: string,
    name?: string,
    role?: string
}

type CreatorSummary = {
    resourceURL?: string,
    name?: string,
    role?: string
}

type StorySummary = {
    resourceURL?: string,
    name?: string,
    role?: string
}

type EventSummary = {
    resourceURL?: string,
    name?: string
}

type ComicDate = {
    type?: string,
    date?: Date
}

type ComicPrice = {
    type?: string,
    price?: number
}

type Image = {
    path?: string,
    extension?: string
}

type CreatorList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: CreatorSummary[]
}

type CharacterList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: CharacterSummary[]
}

type StoryList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: StorySummary[]
}

type EventList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: EventSummary[]
}

type Comic = {
    id?: number,
    digitalId?: number,
    title?: string,
    issueNumber?: number,
    variantDescription?: string,
    description?: string,
    modified?: Date,
    isbn?: string,
    upc?: string,
    diamondCode?: string,
    ean?: string,
    issn?: string,
    format?: string,
    pageCount?: number,
    textObjects?: TextObject[],
    resourceURI?: string,
    urls?: Url[],
    series?: SeriesSummary,
    variants?: ComicSummary[],
    collections?: ComicSummary[],
    collectedIssues?: ComicSummary[],
    dates?: ComicDate[],
    prices?: ComicPrice[],
    thumbnail?: Image,
    images?: Image[],
    creators?: CreatorList,
    characters?: CharacterList,
    stories?: StoryList,
    events?: EventList
}

type ComicList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: ComicSummary[]
}


type SeriesList = {
    available?: number,
    returned?: number,
    collectionURL?: string,
    items?: SeriesSummary[]
}

type Character = {
    id?: number,
    name?: string,
    description?: string,
    modified?: Date,
    resourceURL?: string,
    urls?: Url[],
    thumbnail?: Image,
    comics?: ComicList,
    stories?: StoryList,
    events?: EventList,
    series?: SeriesList
}
