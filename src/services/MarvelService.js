class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=6c6e097a64d28f62c652b76a6f9b8a61';
    _baseOffset = 300;

    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) =>{
       const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
       return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) =>{
        return{
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'DESCRIPTION NOT FOUND',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
        
    }

}
export default MarvelService;