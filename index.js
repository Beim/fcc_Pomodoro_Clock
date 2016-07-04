let rce = React.createElement.bind()
let rcc = React.createClass.bind()




let total = rcc({
    getInitialState: () => {
        return {
            breakLen: 60*5,
            sessionLen: 300*5,
            leftLen: 300*5,
            display: 'Session',
            timer: null
        }  
    },
    clickHandler: function (e) {
        let valueArr = e.target.attributes['data-myType'].value.split('-')
        if (valueArr[0] === 'Session') {
            let sessionLen = Math.floor(this.state.sessionLen / 60) * 60
            let breakLen = Math.floor(this.state.breakLen / 60) * 60
            if (valueArr[1] === 'dec') {
                if (sessionLen > 60) {
                    sessionLen -= 60
                    this.setState({
                        sessionLen: sessionLen,
                        breakLen: breakLen,
                        leftLen: sessionLen,
                        display: 'Session',
                    })
                }
                //取消倒计时
            }
            else {
                sessionLen += 60
                this.setState({
                    sessionLen: sessionLen,
                    breakLen: breakLen,
                    leftLen: sessionLen,
                    display: 'Session'
                })
            }
        }
        else {
            let sessionLen = Math.floor(this.state.sessionLen / 60) * 60
            let breakLen = Math.floor(this.state.breakLen / 60) * 60
            if (valueArr[1] === 'dec') {
                if (breakLen > 60) {
                    breakLen -= 60
                    this.setState({
                        sessionLen: sessionLen,
                        breakLen: breakLen,
                        leftLen: sessionLen,
                        display: 'Session'
                    })
                }
            }
            else {
                breakLen += 60
                this.setState({
                    sessionLen: sessionLen,
                    breakLen: breakLen,
                    leftLen: sessionLen,
                    display: 'Session'
                })
            }
        }
        
    },
    clockHandler: function () {
        let timer = this.state.timer
        if (timer) {
            clearInterval(timer)
            this.setState({
                timer: null
            })
        }
        else {
            this.startClock()
        }
        
    },
    startClock: function () {
        let timer = this.state.timer
        let _this = this
        timer = setInterval(function () {
            let display = _this.state.display
            let leftLen = _this.state.leftLen
            if (display === 'Session') {
                if (leftLen > 0) {
                    leftLen -= 1
                    _this.setState({
                        leftLen: leftLen,
                        timer: timer
                    })
                }
                else {
                    leftLen = _this.state.breakLen
                    _this.setState({
                        leftLen: leftLen,
                        display: 'Break',
                        timer: timer
                    })
                }
            }
            else {
                if (leftLen > 0) {
                    leftLen -= 1
                    _this.setState({
                        leftLen: leftLen,
                        timer: timer
                    })
                }
                else {
                    leftLen = _this.state.sessionLen
                    _this.setState({
                        leftLen: leftLen,
                        display: 'Session',
                        timer: timer
                    })
                }
            }
        }, 1000)
    },
    render: function () {
        let circleStyle = this.state.display === 'Session' ? {'backgroundColor': 'lawngreen'} : {'backgroundColor': 'lightcoral'}
        let breakTime = Math.floor(this.state.breakLen / 60)
        let sessionTime = Math.floor(this.state.sessionLen / 60)
        let miao = this.state.leftLen % 60
        let fen = Math.floor(this.state.leftLen / 60)
        let showTime = 0
        if (miao == 0) {
            showTime = fen
        }
        else {
            showTime = fen + ' : ' + miao
        }
        let px = 0
        if (this.state.display === 'Session') {
            let percent = 1 - this.state.leftLen / this.state.sessionLen
            px = (-8 + percent * 300 ) + 'px'
        }
        else {
            let percent = 1 - this.state.leftLen / this.state.breakLen
            px = (-8 + percent * 300 ) + 'px'                
        }
        return rce('div', {'className': 'container'},
            rce('div', {'className': 'fcc'}, 'FreeCodeCamp'),
            rce('div', {'className': 'sets pure-g'}, 
                rce('div', {'className': 'pure-u-1-2 set'}, 
                    rce('div', null, 'BREAK LENGTH'),
                    rce('div', {'className': 'adjust'},
                        rce('div', {'className': 'adjustDec', 'data-myType': 'Break-dec', 'onClick': this.clickHandler}, '-'),
                        rce('div', {'className': 'adjustNum'}, breakTime),
                        rce('div', {'className': 'adjustInc', 'data-myType': 'Break-inc', 'onClick': this.clickHandler}, '+')
                    )
                ),
                rce('div', {'className': 'pure-u-1-2 set'}, 
                    rce('div', null, 'SESSION LENGTH'),
                     rce('div', {'className': 'adjust'},
                        rce('div', {'className': 'adjustDec', 'data-myType': 'Session-dec', 'onClick': this.clickHandler}, '-'),
                        rce('div', {'className': 'adjustNum'}, sessionTime),
                        rce('div', {'className': 'adjustInc', 'data-myType': 'Session-inc', 'onClick': this.clickHandler}, '+')
                    )
                    
                )
            ),
            rce('div', {'className': 'sessions'}, 
                rce('div', {'className': 'sessionCircle', 'style': circleStyle}),
                rce('div', {'className': 'sessionBlock', 'style': {'bottom': px}}),
                rce('div', {'className': 'sessionClock', 'onClick': this.clockHandler},
                    rce('div', {'className': 'sessionBreak'}, this.state.display),
                    rce('div', {'className': 'clock'}, showTime)
                )
            )
        )
    }
})

ReactDOM.render(rce(total, null), document.getElementById('content'))