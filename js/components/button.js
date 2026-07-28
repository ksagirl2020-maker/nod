export function Button(text, type = "primary") {

    return `
    
        <button class="btn btn-${type}">
        
            ${text}
        
        </button>
    
    `;

}