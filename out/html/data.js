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
  width: 130px;
  background: #fff4e6;
  color: #3b1f0a;
  text-align: left;
  border-radius: 8px;
  padding: 12px 14px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  border: 1px solid #b22222;
  pointer-events: none;
  font-size: 14px !important;
  line-height: 1.5em !important;
  font-weight: 500 !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transform: translateY(5px);
  text-align: center;
}
.mytooltip:hover .mytooltiptext { opacity: 1; }
.mytooltip .mytooltiptext img { display: block; margin: 0 auto 4px auto; max-width: 90%; height: auto; }

.mytooltip .mytooltiptext {
  bottom: auto;
  top: calc(var(--mouse-y, 0px) - 20px);
  left: calc(var(--mouse-x, 0px));
  transform: translate(-50%, -100%);
}

body.dark-mode .mytooltip:hover {
    background-color: rgb(60, 90, 160);
}

body.dark-mode .mytooltip .mytooltiptext {
    background: #1a1a2e;
    color: #e0e0e0;
    border: 1px solid #7a3b3b;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}
