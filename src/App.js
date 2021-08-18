import './App.css';
import api from './Api';
import { useEffect, useState } from 'react';

function App() {

  const [quote, setQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [currentAuthor, setAuthor] = useState(null);

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    api.get('quotes/random')
    .then(response => {
      setQuote(response.data.data[0]);
      setQuotes([]);
      setAuthor(null);
    })
    .catch(error => {
      console.log(error)
      setQuote(null);
    });
  }

  const getQuotesByAuthor = (author) => {
    console.log(author);
    api.get('quotes?author=' + author)
    .then(response => {
      setQuote(null);
      setQuotes(response.data.data);
      setAuthor(author);
    })
    .catch(error => {
      console.log(error)
      setQuote(null);
    });
  }

  return (
    <div id="content">
      <button id="random" onClick={() => {setQuote(null); getQuote();}}><span class="material-icons">cached</span>Random</button>

      { quote != null && quotes.length == 0 && <div className="quote">
        <div className="text">{quote.quoteText}</div>

        <div className="info" onClick={() => {getQuotesByAuthor(quote.quoteAuthor)}}>
          <p className="author">{quote.quoteAuthor}</p>
          <p className="genre">{quote.quoteGenre}</p>
          <span class="arrow material-icons">trending_flat</span>
        </div>

      </div>}

      { quotes.length > 0 && <div className="quotes-list">
          <h2>{currentAuthor}</h2>
          {quotes.map(q => (
            <div class="quote quote-list" key={q._id}>
              <div className="text">{q.quoteText}</div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
