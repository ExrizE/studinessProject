import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Form, Row } from 'reactstrap';
import { X } from 'react-feather';
import { MENUITEMS } from '../sidebar/menu';
import LeftHeader from './leftbar';
import RightHeader from './rightbar';
import { Link } from 'react-router-dom';

const Header = () => {

    const mainmenu = MENUITEMS;
    const [searchValue, setsearchValue] = useState('');

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setsearchValue('')
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const handleSearchKeyword = (keyword) => {
        keyword ? addFix() : removeFix()
        const items = [];
        setsearchValue(keyword)
        mainmenu.map(menuItems => {
            if (menuItems.title.toLowerCase().includes(keyword)) {
                items.push(menuItems);
            }
            checkSearchResultEmpty(items)
            setsearchValue(items);
            return menuItems
        });
    }

    const checkSearchResultEmpty = (items) => {

        if (!items.length) {
            document.querySelector(".empty-menu").classList.add('is-open');
        } else {
            document.querySelector(".empty-menu").classList.remove('is-open');
        }
    }

    const addFix = () => {
        document.querySelector(".Typeahead-menu").classList.add('is-open');
        document.body.classList.add('offcanvas')
    }

    const removeFix = () => {
        setsearchValue('')
        document.querySelector(".Typeahead-menu").classList.remove('is-open');
        document.body.classList.remove('offcanvas')
    }

    return (
        <Fragment>
            <div className="page-header">
                <Row className="header-wrapper m-0">
                    <Form className="form-inline search-full" action="#" method="get">
                        <div className="form-group w-100">
                            <div className="Typeahead Typeahead--twitterUsers">
                                <div className="u-posRelative">
                                    <input
                                        className="Typeahead-input form-control-plaintext w-100"
                                        id="demo-input"
                                        type="search"
                                        placeholder="Search Studiness .."
                                        defaultValue={searchValue}
                                        onChange={(e) => handleSearchKeyword(e.target.value)}
                                    />
                                    <div className="spinner-border Typeahead-spinner" role="status">
                                        <span className="sr-only">Loading</span>
                                    </div><X className="close-search" onClick={() => document.querySelector(".search-full").classList.remove("open")} />
                                </div>
                                <div className="Typeahead-menu custom-scrollbar" id="search-outer">
                                    {searchValue ?
                                        searchValue.map((data, index) => {
                                            return (
                                                <div className="ProfileCard u-cf" key={index}>
                                                    <div className="ProfileCard-avatar">
                                                        <data.icon />
                                                    </div>
                                                    <div className="ProfileCard-details">
                                                        <div className="ProfileCard-realName">
                                                            <Link
                                                                to={data.path + '/'}
                                                                className="realname"
                                                                onClick={removeFix}
                                                            >
                                                                {data.title}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>
                                <div className="Typeahead-menu empty-menu">
                                    <div className="tt-dataset tt-dataset-0">
                                        <div className="EmptyMessage">
                                            {"Opps!! There are no result found."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <LeftHeader />
                    <RightHeader />
                </Row>
            </div>
        </Fragment>
    );
}

export default Header;