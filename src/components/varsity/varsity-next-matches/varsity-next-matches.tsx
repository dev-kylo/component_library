import { Component, h, Prop } from '@stencil/core';
import { removeParams } from '../../../utils/utils';


@Component({
    tag: 'varsity-next-matches',
    shadow: true
})
export class VarsityNextMatches {

    @Prop() data;


    renderMatchList(){
        return this.data.map(evt => {
            let style ={
                'margin': '1em'
            }
            return ([
                <div style={style} class="score-container">
                    <label-card cardtitle={evt.Title} reverse image={removeParams(evt.ImageUrl)} buttonLink={evt.Url} buttonTitle="Find out more" ></label-card> 
                </div>
            ])
        })   
    }
    
    render() {
        return (
            this.renderMatchList()
        );
    }
}