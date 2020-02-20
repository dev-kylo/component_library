import { Component, h, Prop} from '@stencil/core';
import { returnDate } from '../../../../utils/utils';


@Component({
    tag: 'varsity-upcoming',
    styleUrl: 'varsity-upcoming.css'
})
export class VarsityUpcoming {

    @Prop() data;

    mapToLi(data){
        console.log(data)
        return data.map(node => {
            let date = returnDate(node.StartDate)
            return <a href={node.Url}><li data-id={node.Id} >{node.Title}<span class="date">{date.weekday} {date.day}th</span></li></a>
        })
    }
    
    render() {
        return (
            <ul>
                {this.mapToLi(this.data)}
                <a class="button">SEE ALL UPCOMING</a>
            </ul>
        );
    }
}