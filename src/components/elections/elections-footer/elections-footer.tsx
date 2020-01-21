import { Component, h } from '@stencil/core';

@Component({
  tag: 'elections-footer',
  shadow: false
})

export class ElectionsFooter {

  render() {
    return (
	<div class="yellow" id="venuefooter">
		<div class="white" id="venueLogo">
            <div class="mslwidget msl-pagebanner">
                <img src="/pageassets/elections/elections-thumbnail-final.png" />
            </div>
        </div>
		<div class="container">
			<div class="col col-xs-12 col-md-4 black">
				<h3>Contact Us</h3>
				<p>Please provide your K number, full name and KCL email address.</p>
				<purple-button link="mailto:elections@kclsu.org"> elections@kclsu.org </purple-button>
			</div>
	
			<div class="col col-xs-12 col-md-4 black">
				<h3>Have a question?</h3>
				<p> We can help you with any of the following:</p>
				<ul>
					<li class="arrowBefore">Problems logging in</li>
					<li class="arrowBefore">Problems voting</li>
					<li class="arrowBefore">Elections process</li>
					<li class="arrowBefore">Help and guidance</li>
				</ul>
			</div>
	
			<div class="col col-xs-12 col-md-4 black">
					<h3>Complaints</h3>
					<p>If you'd like to make a complaint, please click through to the&nbsp;<strong><a class="link" href="/elections/resources/complaints/">Elections Complaints page.</a></strong></p>
            </div>
            <purple-button link="/elections"> Elections Home Page </purple-button>>
		</div>
    </div>
    );  
  }
}
