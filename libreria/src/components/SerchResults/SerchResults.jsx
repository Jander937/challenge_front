import React from "react";
import Navb from "../Navb";

function SearchResults({ searchResults }) {
  return (
    <div>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <a href={result.url} target="_blank" rel="noreferrer">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;