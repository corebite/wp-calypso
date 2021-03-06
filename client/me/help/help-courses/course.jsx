/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import CourseScheduleItem from './course-schedule-item';
import HelpTeaserButton from '../help-teaser-button';
import CourseVideos from './course-videos';
import sitesList from 'lib/sites-list';
import analytics from 'lib/analytics';

/**
 * Module variables
 */
const sites = sitesList();

class Course extends Component {
	componentDidMount() {
		const {
			isBusinessPlanUser
		} = this.props;

		analytics.tracks.recordEvent( 'calypso_help_course_pageview', {
			is_business_plan_user: isBusinessPlanUser
		} );
	}

	render() {
		const {
			title,
			description,
			schedule,
			isBusinessPlanUser,
			videos,
			translate
		} = this.props;

		const { slug } = sites.getPrimary();

		return (
			<div className="help-courses__course">
				<Card compact className="help-courses__course-label">{ translate( 'Next course' ) }</Card>
				<Card compact>
					<h1 className="help-courses__course-title">{ title }</h1>
					<p className="help-courses__course-description">{ description }</p>
					{ ! isBusinessPlanUser &&
						<HelpTeaserButton
							href={ `/plans/${ slug }` }
							title={ translate( 'Join this course with the Business Plan.' ) }
							description={
								translate( 'Upgrade to access webinars and courses to learn how to make the most of your site' )
							}
						/>
					}
				</Card>
				{ schedule.map( ( item, key ) => {
					return ( <CourseScheduleItem { ...item } key={ key } isBusinessPlanUser={ isBusinessPlanUser } /> );
				} ) }
				{ isBusinessPlanUser && <CourseVideos videos={ videos } /> }
			</div>
		);
	}
}

export default localize( Course );

export const CoursePlaceholder = () => {
	return (
		<div className="help-courses__course is-placeholder"></div>
	);
};
