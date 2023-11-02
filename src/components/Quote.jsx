import { useState, useEffect } from "react";
import './Quote.css'


export default function Quote() {
    const [quotes, setQuotes] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        randomQuote()
    }, [])

    const randomQuote = async () => {
        const quote = await fetch("https://inspo-quotes-api.herokuapp.com/quotes/random");
        const response = await quote.json();

        if (response.quote.author === null) {
            setAuthor('Anonymous')
        }

        setQuotes(response.quote.text);
        setAuthor(response.quote.author);
        setIsLoading(false);
    }


    const handleQuote = () => {
        randomQuote();
    }

    return (


        <div className="quotebox center">
            {isLoading && <p>Loading....</p>}
            <div className="text">{quotes}</div>
            <div className="author">- {author}</div>
            <button className="button" onClick={handleQuote}>Give Me Advice!</button>
        </div>

    )
}