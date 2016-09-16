/**
 * External dependencies
 */
import React from 'react';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

/**
 * Internal dependencies
 */
import { PostRelativeTime } from 'blocks/post-relative-time';

describe( 'PostRelativeTime', () => {
	it( 'should use the modified date if the post status is draft', () => {
		const post = {
			status: 'draft',
			modified: '2016-09-14T15:47:33-04:00',
			date: '2016-09-13T15:47:33-04:00'
		};

		const wrapper = shallow(
			<PostRelativeTime
				post={ post }
				moment={ moment }
			/>
		);

		const text = wrapper.find( '.post-relative-time__text' ).text();
		expect( text ).to.equal( moment( post.modified ).fromNow() );
	} );

	it( 'should use the modified date if the post status is pending', () => {
		const post = {
			status: 'pending',
			modified: '2016-09-14T15:47:33-04:00',
			date: '2016-09-13T15:47:33-04:00'
		};

		const wrapper = shallow(
			<PostRelativeTime
				post={ post }
				moment={ moment }
			/>
		);

		const text = wrapper.find( '.post-relative-time__text' ).text();
		expect( text ).to.equal( moment( post.modified ).fromNow() );
	} );

	it( 'should use the modified date if the post status is not pending/draft', () => {
		const post = {
			status: 'publish',
			modified: '2016-09-14T15:47:33-04:00',
			date: '2016-09-13T15:47:33-04:00'
		};

		const wrapper = shallow(
			<PostRelativeTime
				post={ post }
				moment={ moment }
			/>
		);

		const text = wrapper.find( '.post-relative-time__text' ).text();
		expect( text ).to.equal( moment( post.date ).fromNow() );
	} );

	it( 'should render placeholder when post is null', () => {
		const post = null;

		const wrapper = shallow(
			<PostRelativeTime
				post={ post }
				moment={ moment }
			/>
		);

		assert( wrapper.hasClass( 'is-placeholder' ) );
	} );
} );
