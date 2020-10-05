import React, { Component } from 'react';
import './chessboard.css';
import ContextMenu from './components/ContextMenu';

export default class ChessBoard extends Component {
    state={
        visible: false,
        x: 0,
        y: 0,
        contextStyle: {},
        clickedPiece: '',
        totalBlackPieces: [],
        totalWhitePieces: [],
        blackPieceName: [],
        whitePieceName: [],
        pieceCount: 0, 
        pieceIndex: 0,
        disabled: true,
        submit: false,
        results: false,
        correctWhitePieces:[
            'pawn','pawn','pawn','pawn','pawn','pawn','pawn','pawn',
            'rook','knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook' 
        ],
        correctBlackPieces:[
            'rook','knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook' ,
            'pawn','pawn','pawn','pawn','pawn','pawn','pawn','pawn',
        ],
        correctBlackCount: 0,
        incorrectBlackCount: 0,
        correctWhiteCount:0,
        incorrectWhiteCount: 0,
        trueWhiteIndexes: [],
        trueBlackIndexes: []
    }

    componentDidMount=()=>{
        for(var i = 0; i<16; i++){
            this.state.totalBlackPieces.push(0);
            this.state.totalWhitePieces.push(0);
            this.state.trueBlackIndexes.push(0);
            this.state.trueWhiteIndexes.push(0);
            this.state.blackPieceName.push('');
            this.state.whitePieceName.push('');
        }
        this.setState(
            {
                totalBlackPieces: [...this.state.totalBlackPieces],
                totalWhitePieces: [...this.state.totalWhitePieces],
                blackPieceName: [...this.state.blackPieceName],
                whitePieceName: [...this.state.whitePieceName],
                trueBlackIndexes: [...this.state.trueBlackIndexes],
                trueWhiteIndexes: [...this.state.trueWhiteIndexes]
            }
        )
    }

    handleRightClick=async(e, bottom_val, left_val, piece_name, piece_index)=>{
        e.preventDefault();
        this.setState({
            x: 0,
            y: 0
        })
        const clickX = e.nativeEvent.offsetX;
        const clickY = e.nativeEvent.offsetY;
        this.setState({ 
            visible: true, 
            x: await clickX, 
            y: await clickY,
            contextStyle: {
                position: 'absolute',
                bottom: `${this.state.y+bottom_val+30}px`,
                left:`${this.state.x+left_val + 500}px`,
                transform: 'scale(1)',
                transition: 'transform 800ms ease-in'
                },
            pieceIndex: piece_index,
            clickedPiece: piece_name
         });

    }

    hideContextMenu=()=>{
        this.setState({
            visible: false,
            x: 0,
            y: 0,
            pieceIndex: 0,
            clickedPiece: ''
        })
    }

    getClickedItem=(val)=>{
        if(val==='delete'){
            this.deletePiece();
        }
        if(this.state.clickedPiece==='black'){
        this.state.blackPieceName[this.state.pieceIndex] = val;
        this.state.totalBlackPieces[this.state.pieceIndex] = 1;
         this.setState({
             totalBlackPieces: [...this.state.totalBlackPieces],
             blackPieceName: [...this.state.blackPieceName],
             pieceCount: this.state.pieceCount + 1
         })
         if(this.state.pieceCount===31){
             this.setState({
                 disabled: false
             })
         }
        }else{
            this.state.whitePieceName[this.state.pieceIndex] = val;
            this.state.totalWhitePieces[this.state.pieceIndex] = 1;
             this.setState({
                 totalWhitePieces: [...this.state.totalWhitePieces],
                 whitePieceName: [...this.state.whitePieceName],
                 pieceCount: this.state.pieceCount + 1
             })
             if(this.state.pieceCount===31){
                this.setState({
                    disabled: false
                })
            }
        }
    }

    deletePiece=async()=>{

        if(this.state.clickedPiece==='black'){
            this.state.blackPieceName[this.state.pieceIndex] = '';
            this.state.totalBlackPieces[this.state.pieceIndex] = 0;
             this.setState({
                 totalBlackPieces: await [...this.state.totalBlackPieces],
                 blackPieceName: await [...this.state.blackPieceName],
                 pieceCount: await this.state.pieceCount - 1
             })

            }else{
                this.state.whitePieceName[this.state.pieceIndex] = '';
                this.state.totalWhitePieces[this.state.pieceIndex] = 0;
                 this.setState({
                     totalWhitePieces: await [...this.state.totalWhitePieces],
                     whitePieceName: await [...this.state.whitePieceName],
                     pieceCount: await this.state.pieceCount - 1
                 })
            }
    }

    handleSubmit=()=>{
        // this.setState({
        //     disabled: false
        // })
        if(this.state.disabled){
            alert('You need to arrange all the pieces first')
        }else{
            
            for(var i=0; i<16; i++){
                if(this.state.correctWhitePieces[i]===this.state.whitePieceName[i]){
                    console.log('a',i);
                    
                        this.state.correctWhiteCount = this.state.correctWhiteCount + 1;
                
                }
                 else{
                    console.log('b',i);
                
                        this.state.incorrectWhiteCount= this.state.incorrectWhiteCount + 1;
                    
                }
           
            }
            for(var j=0; j<16; j++){
                if(this.state.correctBlackPieces[j]===this.state.blackPieceName[j]){
                    console.log('a',j);
                    
                        this.state.correctBlackCount= this.state.correctBlackCount + 1
                    
                }
                 else{
                    console.log('b',j);
                    
                        this.state.incorrectBlackCount = this.state.incorrectBlackCount + 1
                    
                }
 
            }
            this.setState({
                submit: true,
                results: true
            })
        }
    }
    handleMistakes=async()=>{
        for(var i=0; i<16; i++){
            if(this.state.correctWhitePieces[i]!==this.state.whitePieceName[i]){
                this.state.trueWhiteIndexes[i] = 1;
            }
        }
        for(var j=0; j<16; j++){
            if(this.state.correctBlackPieces[j]!==this.state.blackPieceName[j]){
                this.state.trueBlackIndexes[j] = 1;
            }
        }
        this.setState({
            trueWhiteIndexes: await [...this.state.trueWhiteIndexes],
            trueBlackIndexes: await [...this.state.trueBlackIndexes]
        })
    }

    handleDefaultConfig=()=>{
        this.setState({
            totalBlackPieces: [],
            totalWhitePieces: [],
            trueWhiteIndexes: [],
            trueBlackIndexes: []
        })
        this.state.blackPieceName = this.state.correctBlackPieces;
        this.state.whitePieceName = this.state.correctWhitePieces
        for(var i = 0; i<16; i++){
            this.state.totalBlackPieces.push(1);
            this.state.totalWhitePieces.push(1);
            this.state.trueBlackIndexes.push(0);
            this.state.trueWhiteIndexes.push(0);
        }
        this.setState({
            totalWhitePieces: [...this.state.totalWhitePieces],
            totalBlackPieces: [...this.state.totalBlackPieces],
            blackPieceName:  [...this.state.blackPieceName],
            whitePieceName:  [...this.state.whitePieceName],

        })
    }

    handleReset=()=>{
        window.location.reload();
    }

    render() {
        return (


                <div className='cb-page' onClick={this.hideContextMenu} >
                    {
                        this.state.visible ? <ContextMenu style={this.state.contextStyle} getPiece={this.getClickedItem} /> : null
                    }
                    {
                        !this.state.submit ? 
                    <div className='dashboard'>
                        <div style={{ display: 'flex', marginTop:'20px', justifyContent: 'center' }}>
                            <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/prize.png' />
                            <h2 style={{ color: '#fff', fontWeight: 'bold',marginTop:'10px',  textDecoration: 'underline' }}>First Test</h2>
                        </div>
                        <p style={{margin: 'auto', marginTop: '20px', color: '#fff', width: '90%'}}>
                            This text is to check whether you are able to put all the pieces to their appropriate places or not.
                            There is no time limit to this test. But I hope you won't take any longer :)
                        </p>
                        <p style={{margin: 'auto', marginTop: '40px', color: '#fff', width: '90%'}}>
                            Rules of this test are simple. You just have to right click on a square to get a context menu which will show
                            you all the pieces. Click on a piece to fill the square. If you click a different piece by mistake, don't worry
                            you can delete the piece and choose again any number of times.
                        </p>
                        <p style={{margin: 'auto', marginTop: '40px', color: '#fff', width: '90%'}}>
                            Once you are sure enough of all the pieces, hit the SUBMIT button below to view the results. Go ahead and
                            try your best.
                        </p>
                        <button className="button" onClick={this.handleSubmit} ><span>Submit! </span></button>
                    </div> 
                      :
                      <div className='dashboard'>
                            <div style={{ display: 'flex', marginTop:'20px', justifyContent: 'center' }}>
                                <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/trophy.png' />
                                <h2 style={{ color: '#fff', fontWeight: 'bold',marginTop:'10px', fontSize: '30px' }}>Great!</h2>
                            </div>
                            <div className='tile-white1'>
                                <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/correct.png' />
                                <h4 className='tile-text-white'>Correct White Pieces: {this.state.correctWhiteCount}</h4>
                            </div>
                            <div className='tile-white2'>
                                <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/incorrect.png' />
                                <h4 className='tile-text-white'>Incorrect White Pieces: {this.state.incorrectWhiteCount}</h4>
                            </div>
                            <div className='tile-black1'>
                                <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/correct.png' />
                                <h4 className='tile-text-black'>Correct Black Pieces: {this.state.correctBlackCount}</h4>
                            </div>
                            <div className='tile-black2'>
                                <img style={{ height: '50px', width: '50px', marginRight: '10px' }} src='/images/incorrect.png' />
                                <h4 className='tile-text-black'>Incorrect Black Pieces: {this.state.incorrectBlackCount}</h4>
                            </div>

                            <button className="mistakes" onClick={this.handleMistakes} ><span>Mistakes</span></button>
                            <button className="answer" onClick={this.handleDefaultConfig} ><span>Correct Way!</span></button>
                            <button className="reset" onClick={this.handleReset} ><span>Try Again!</span></button>

                      </div> 
                    
                    }
                    <table >
                    <tr >
                            <td className={this.state.trueBlackIndexes[0] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 70, 'black', 0)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[0] ? <img src={'/images/black/' + this.state.blackPieceName[0] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[1] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 140, 'black', 1)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[1] ? <img src={'/images/black/' + this.state.blackPieceName[1] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[2] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 210, 'black', 2)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[2] ? <img src={'/images/black/' + this.state.blackPieceName[2] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[3] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 280, 'black', 3)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[3] ? <img src={'/images/black/' + this.state.blackPieceName[3] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[4] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 350, 'black', 4)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[4] ? <img src={'/images/black/' + this.state.blackPieceName[4] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[5] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 420, 'black', 5)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[5] ? <img src={'/images/black/' + this.state.blackPieceName[5] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[6] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 490, 'black', 6)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[6] ? <img src={'/images/black/' + this.state.blackPieceName[6] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[7] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 350, 560, 'black', 7)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[7] ? <img src={'/images/black/' + this.state.blackPieceName[7] + '.png'} /> : null
                                }
                            </td>
                        </tr>

                        <tr >
                            <td className={this.state.trueBlackIndexes[8] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 70, 'black', 8)}>
                                {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[8] ? <img src={'/images/black/' + this.state.blackPieceName[8] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[9] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 140, 'black', 9)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[9] ? <img src={'/images/black/' + this.state.blackPieceName[9] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[10] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 210, 'black', 10)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[10] ? <img src={'/images/black/' + this.state.blackPieceName[10] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[11] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 280, 'black', 11)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[11] ? <img src={'/images/black/' + this.state.blackPieceName[11] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[12] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 350, 'black', 12)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[12] ? <img src={'/images/black/' + this.state.blackPieceName[12] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[13] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 420, 'black', 13)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[13] ? <img src={'/images/black/' + this.state.blackPieceName[13] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[14] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 490, 'black', 14)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[14] ? <img src={'/images/black/' + this.state.blackPieceName[14] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueBlackIndexes[15] ? 'wrong-black' : null} onContextMenu={(e)=>this.handleRightClick(e, 280, 560, 'black', 15)}>
                               {
                                    this.state.totalBlackPieces.length &&
                                    this.state.totalBlackPieces[15] ? <img src={'/images/black/' + this.state.blackPieceName[15] + '.png'} /> : null
                                }
                            </td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </tr>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </tr>
                        <tr >
                            <td className={this.state.trueWhiteIndexes[0] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 70, 'white', 0)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[0] ? <img src={'/images/white/' + this.state.whitePieceName[0] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[1] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 140, 'white', 1)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[1] ? <img src={'/images/white/' + this.state.whitePieceName[1] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[2] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 210, 'white', 2)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[2] ? <img src={'/images/white/' + this.state.whitePieceName[2] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[3] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 280, 'white', 3)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[3] ? <img src={'/images/white/' + this.state.whitePieceName[3] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[4] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 350, 'white', 4)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[4] ? <img src={'/images/white/' + this.state.whitePieceName[4] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[5] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 420, 'white', 5)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[5] ? <img src={'/images/white/' + this.state.whitePieceName[5] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[6] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 490, 'white', 6)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[6] ? <img src={'/images/white/' + this.state.whitePieceName[6] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[7] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 140, 560, 'white', 7)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[7] ? <img src={'/images/white/' + this.state.whitePieceName[7] + '.png'} /> : null
                                }
                            </td>
                        </tr>

                        <tr >
                            <td className={this.state.trueWhiteIndexes[8] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 70, 'white', 8)}>
                                {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[8] ? <img src={'/images/white/' + this.state.whitePieceName[8] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[9] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 140, 'white', 9)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[9] ? <img src={'/images/white/' + this.state.whitePieceName[9] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[10] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 210, 'white', 10)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[10] ? <img src={'/images/white/' + this.state.whitePieceName[10] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[11] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 280, 'white', 11)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[11] ? <img src={'/images/white/' + this.state.whitePieceName[11] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[12] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 350, 'white', 12)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[12] ? <img src={'/images/white/' + this.state.whitePieceName[12] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[13] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 420, 'white', 13)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[13] ? <img src={'/images/white/' + this.state.whitePieceName[13] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[14] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 490, 'white', 14)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[14] ? <img src={'/images/white/' + this.state.whitePieceName[14] + '.png'} /> : null
                                }
                            </td>
                            <td className={this.state.trueWhiteIndexes[15] ? 'wrong-white' : null} onContextMenu={(e)=>this.handleRightClick(e, 70, 560, 'white', 15)}>
                               {
                                    this.state.totalWhitePieces.length &&
                                    this.state.totalWhitePieces[15] ? <img src={'/images/white/' + this.state.whitePieceName[15] + '.png'} /> : null
                                }
                            </td>
                        </tr>
                    </table>

                  
                </div>
        )
    }
}
