import React from 'react'

export default function BookDetails({data}) {
  return (
    <div id="book-details">
        {data &&
        <>
            <h3>Book Details</h3>
            <p>{data.name}</p>
            <p>{data.genre}</p>
            <p>{data.author.name}</p>
        </> 
        }
    </div>
  )
}
