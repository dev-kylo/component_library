import { Component, h, Prop, Listen} from '@stencil/core';
import { returnDate, getNextEvents } from '../../../../utils/utils';


@Component({
    tag: 'varsity-upcoming',
    styleUrl: 'varsity-upcoming.css',
    shadow: true
})
export class VarsityUpcoming {

    @Prop() data;
    @Prop() showall:boolean = false;

    mapToLi(data){
        let sliced = getNextEvents(data, 8)
        return sliced.map(node => {
            let date = returnDate(node.StartDate)
            return <a href={node.Url}><li data-id={node.Id} >{node.Title}<span class="date">{date.weekday} {date.day}th</span></li></a>
        })
    }

    @Listen('exitModal') closeModal(){
        this.showall= false;
    }

    clickHandler(e){
        e.preventDefault();
        this.showall = true;
    }
    
    render() {
        return ([
            <kclsu-modal show={this.showall}>
               {!this.showall? '' :  <varsity-next-matches data={getNextEvents(this.data, this.data.length)}> </varsity-next-matches>}
            </kclsu-modal>,
            <ul>
                {this.mapToLi(this.data)}
                <a onClick={(e) => this.clickHandler(e)} class="button">See All Upcoming </a>
            </ul>
        ]);
    }
}