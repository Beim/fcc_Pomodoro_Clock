let rce = React.createElement.bind()
let rcc = React.createClass.bind()




let total = rcc({
    getInitialState: () => {
        return {
            
        }  
    },
    render: () => {
        return rce('div', {'className': 'container'},
            // 'hello'
            rce('div', {'className': 'fcc'}, 'FreeCodeCamp'),
            rce('div', {'className': 'sets pure-g'}, 
                rce('div', {'className': 'pure-u-1-2 set'}, 
                    rce('div', null, 'BREAK LENGTH'),
                    rce('div', null, '- 5 +')
                ),
                rce('div', {'className': 'pure-u-1-2 set'}, 
                    rce('div', null, 'BREAK LENGTH'),
                    rce('div', null, '- 5 +')
                )
            ),
            rce('div', {'className': 'sessions'}, 
                rce('div', {'className': 'sessionCircle'}),
                rce('div', {'className': 'sessionBlock'}),
                rce('div', {'className': 'sessionClock'},
                    rce('div', {'className': 'sessionBreak'}, 'Session'),
                    rce('div', {'className': 'clock'}, '0:30')
                )
            )
        )
    }
})

ReactDOM.render(rce(total, null), document.getElementById('content'))