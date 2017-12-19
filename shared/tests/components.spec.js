import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import DrinkListItem from '../components/DrinkListItem/DrinkListItem';
import DrinkCreateView from '../components/DrinkCreateView/DrinkCreateView';
import React from 'react';
import expectJSX from 'expect-jsx';
import { Link } from 'react-router';

expect.extend(expectJSX);

describe('component tests', () => {
  it('should render DrinkListItem properly', () => {
    const renderer = TestUtils.createRenderer();
    const post = {
      name: 'Prank',
      title: 'first post',
      content: 'hello world!',
      slug: 'first-post',
      cuid: 'cikpdcdn60000zjxom3dmavzq',
    };
    renderer.render(
      <DrinkListItem
        post={post}
        onClick={function click() {}}

        onDelete={function noop() {}}

      />
    );
    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(
      <div className="single-post">
        <h3 className="post-title ">
          <Link to={`/post/${post.slug}-${post.cuid}`} onClick={function noop() {}}>
            {post.title}
          </Link>
        </h3>
        <p className="author-name">By {post.name}</p>
        <p className="post-desc">{post.content}</p>
        <p className="post-action"><a href="#" onClick={function noop() {}}>Delete Drink</a></p>
        <hr className="divider"/>
      </div>
    );
  });

  it('should render DrinkCreateView properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<DrinkCreateView showAddDrink={false} addDrink={function noop() {}}/>);

    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(
      <div className="form ">
        <div className="form-content">
          <h2 className="form-title">Create new post</h2>
          <input placeholder="Author's Name" className="form-field" ref="name"/>
          <input placeholder="Drink Title" className="form-field" ref="title"/>
          <textarea placeholder="Drink Content" className="form-field" ref="content"></textarea>
          <a className="post-submit-button align-right" href="#" onClick={function noop() {}}>Submit</a>
        </div>
      </div>
    );
  });

  it('should show post create form in  DrinkCreateView if showAddDrink is true', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<DrinkCreateView showAddDrink addDrink={function noop() {}}/>);

    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(
      <div className="form appear">
        <div className="form-content">
          <h2 className="form-title">Create new post</h2>
          <input placeholder="Author's Name" className="form-field" ref="name"/>
          <input placeholder="Drink Title" className="form-field" ref="title"/>
          <textarea placeholder="Drink Content" className="form-field" ref="content"></textarea>
          <a className="post-submit-button align-right" href="#" onClick={function noop() {}}>Submit</a>
        </div>
      </div>
    );
  });
});
