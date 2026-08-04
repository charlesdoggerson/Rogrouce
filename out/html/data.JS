//thank you Communist45/that_socialist_guy for the code 

const colourList = [{
        word: "RKP",
        style: "color: #591716; font-weight: bold;"
    },
    {
        word: "UNP",
        style: "color: #006400; font-weight: bold;"
    },
];
const tooltipList = [{
    searchString: "RKP",
    explanationText: "<img src=img/logos/RKP.jpg> Rogroucean Communist Party"
    },
    {
    searchString: "Appointed",
    explanationText: "<img src=img/logos/governer_general_Logo.png> Appointed by the Governor-General"
    },
];


//This is the JS code, it just needs to be before the end of the file
window.displayText = function (text) {
        return applyWholesome(text);
    };
  
    //To check if extra dynamic or not
    function getDynamicTooltipContent(searchString, baseTooltip) {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? 
                window.dendryUI.dendryEngine.state.qualities : null;
        
        if (!Q) return baseTooltip.explanationText;

        if (searchString === 'Sinhalese' && Q.sinhala_proportion !== undefined) {
            var proptext = Q.sinhala_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }

        return baseTooltip.explanationText;
        
    }
    
    window.getDynamicTooltipContent = getDynamicTooltipContent;
  
    function applyWholesome(str) {
        const allWords = new Set([
            ...tooltipList.map(t => t.searchString),
            ...colourList.map(c => c.word)
        ]);
    
        // Escape special regex characters in the words
        const escapedWords = [...allWords].map(word => 
            word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );
        
        const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'g');
    
        return str.replace(/(<(?:span|strong)[^>]*>.*?<\/(?:span|strong)>|<[^>]+>|[^<]+)/g, (segment) => {
            if (segment.startsWith('<')) return segment;
    
            return segment.replace(regex, (match) => {
                const tooltip = tooltipList.find(t => t.searchString === match);
                const colour = colourList.find(c => c.word === match);
    
                let style = colour ? colour.style : '';
                let innerText = match;
    
                if (colour && colour.img) {
                    innerText = `<img src="${colour.img}" class="p_icon" alt="">${innerText}`;
                }
    
                if (tooltip) {
                    var tooltipContent = getDynamicTooltipContent(match, tooltip);
                    return `<span class='mytooltip' style='${style}'>${innerText}<span class='mytooltiptext'>${tooltipContent}</span></span>`;
                } else if (colour) {
                    return `<span style='${style}'>${innerText}</span>`;
                }
    
                return match;
            });
        });
    }



//this is the css code, can go anywhere
.mytooltip {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  padding: 2px 1px;
}
.mytooltip:hover { background-color: rgb(100, 140, 220); }
/*with enhancements by communist45*/
.mytooltip .mytooltiptext {
  position: fixed;
  z-index: 999999;
... (40 lines left)
