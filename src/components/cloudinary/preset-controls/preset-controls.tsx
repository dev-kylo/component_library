import { Component, h, State, Event, EventEmitter, Element, Listen } from '@stencil/core';


@Component({
    tag: 'preset-controls',
    styleUrl: 'preset-controls.css',
})
export class PresetControls {

    @State() modalOpen:boolean = false;
    @Event() submitEdits: EventEmitter;

    @Element() host: HTMLElement;

    submit(e){
        e.preventDefault();
        let element = e.target;
        let direction = element[0].value;
        let width = element[1].value;
        let height= element[2].value;
        let edits:any = {};
        if (direction) edits.direction = direction;
        if (width) edits.width = +width;
        if (height) edits.height = +height;
        this.submitEdits.emit(edits)
        this.clearInputs()
        this.modalOpen = false;
    }
    

    clearInputs(){
        let inputs = this.host.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        this.host.querySelector('select').value = '';
    }

    openControls(){
        this.modalOpen = true;
    }
    closeControls(){
        this.clearInputs();
        this.modalOpen = false;
    }

    @Listen('emitClick')
    onEmittedClick(event:CustomEvent){
        if(event.detail === 'openAdjustments') this.openControls();
        else if(event.detail === 'closeAdjustments') this.closeControls();
    }

    render() {
        return ([
            <kclsu-modal show={this.modalOpen}>
            <div class="controls">
                <form class="controlForm" onSubmit={(e) => this.submit(e)}>
                <span class="title">Adjust the crop focus and dimensions of your image.</span>
                    <div class="flex">
                        <label>Crop Focus</label>
                        <select name="direction">
                            <option value="faces:auto">Faces</option>
                            <option value="center">Center</option>
                            <option value="north">Top</option>
                            <option value="east">Right</option>
                            <option value="south">Bottom</option>
                            <option value="west">Left</option>
                        </select>
                    </div>
                    <div class="flex">
                        <label> Width</label>
                        <input type="text" value=""/>
                    </div>
                    <div class="flex">
                        <label> Height</label>
                        <input type="text" value=""/>
                    </div>
                    <flex-container alignx='center'>
                        <button id="form_button">Make Adjustment</button>
                        <kclsu-button emitid='closeAdjustments' green small >Cancel</kclsu-button>
                    </flex-container>
                </form>
            </div>
            </kclsu-modal>,
            <kclsu-button emitid='openAdjustments' green small >Adjustments</kclsu-button>
        ]);
    }
}