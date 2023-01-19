import React from 'react'
import './AddArticle.css'

function AddArticle() {
  return (
    <div className="add-article-container">
        <form className="add-article-form"  >
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text"  id="title"
                placeholder="Maximum 100 characters"
                />
            </div> 
            <div className="input-group">        
                <label htmlFor="summary">Summary</label>
                <textarea id="summary"
                placeholder="Maximum 120 characters"
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea name="paragraphOne" 
                placeholder="Maximum 650 characters"
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea id="paragraphTwo"
                placeholder="Maximum 650 characters"
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea id="paragraphThree" 
                placeholder="Maximum 650 characters"
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category">
                    <option value="">Select</option>
                    
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"
                
                />
            </div>
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}

export default AddArticle