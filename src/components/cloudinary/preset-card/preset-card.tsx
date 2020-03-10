import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'preset-card',
    styleUrl: 'preset-card.css',
    shadow: true
})
export class PresetCard {

    @Prop() dimensions: string;
    @Prop() presetname: string;
    @Prop() presetid: string;

    @Event()
    selectPreset: EventEmitter;

    clickListener(e){
        e.preventDefault();
        this.selectPreset.emit(this.presetid);
    }
    
    render() {
        return (
            <div data-pres={this.presetid} class='container' onClick={e => this.clickListener(e)}>
                <div class="dimensions"><span>{this.dimensions}</span></div>
                <div class="title">{this.presetname}</div>
            </div>
        );
    }
}