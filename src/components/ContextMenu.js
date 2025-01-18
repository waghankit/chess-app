import React, { Component } from 'react';
import './contextmenu.css'

export default class ContextMenu extends Component {

    handleClick=(val)=>{
        this.props.getPiece(val);
    }
    render() {
        const { style } = this.props;
        return (
            <div style={style} className='custom-context'>
                <div className='context-item' onClick={()=>this.handleClick('king')}>
                    <img src='/images/black/king.png' className='item-img' />
                    <h4 className='item-text'>King</h4>
                </div>
                <div className='context-item' onClick={()=>this.handleClick('queen')}>
                    <img src='/images/black/queen.png' className='item-img' />
                    <h4 className='item-text'>Queen</h4>
                </div>
                <div className='context-item' onClick={()=>this.handleClick('rook')}>
                    <img src='/images/black/rook.png' className='item-img' />
                    <h4 className='item-text'>Rook</h4>
                </div>
                <div className='context-item' onClick={()=>this.handleClick('knight')}>
                    <img src='/images/black/knight.png' className='item-img' />
                    <h4 className='item-text'>Knight</h4>
                </div>
                <div className='context-item' onClick={()=>this.handleClick('bishop')}>
                    <img src='/images/black/bishop.png' className='item-img' />
                    <h4 className='item-text'>Bishop</h4>
                </div>
                <div className='context-item' onClick={()=>this.handleClick('pawn')}>
                    <img src='/images/black/pawn.png' className='item-img' />
                    <h4 className='item-text'>Pawn</h4>
                </div>
                <hr />
                <div className='context-item-delete' onClick={()=>this.handleClick('delete')}>
                    <img src='/images/delete.png' className='item-img' />
                    <h4 className='item-text'>Delete</h4>
                </div>
            </div>
        )
    }
}
