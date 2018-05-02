import { Editor } from "slate-react";
import { Value } from "slate";
import Html from "slate-html-serializer";
import React from "react";
import { isKeyHotkey } from "is-hotkey";
import { Row, Col, Button } from "reactstrap";
import initialValue from "./value.json";

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = "paragraph";

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

const BLOCK_TAGS = {
  blockquote: "block-quote",
  p: "paragraph",
  li: "list-item",
  ol: "numbered-list",
  ul: "bulleted-list"
};
// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
  pre: "code"
};
const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === "block") {
        switch (obj.type) {
          case "paragraph":
            return <p>{children}</p>;
          case "block-quote":
            return <blockquote>{children}</blockquote>;
          case "bulleted-list":
            return <ul>{children}</ul>;
          case "numbered-list":
            return <ol>{children}</ol>;
          case "list-item":
            return <li>{children}</li>;
          default:
            console.log("should never happen richtexteditor line 69");
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underline":
            return <u>{children}</u>;
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          default:
            console.log("should never happen rich text line 102");
        }
      }
    }
  }
];
const html = new Html({ rules });
/**
 * The rich text example.
 *
 * @type {Component}
 */
class RichTextExample extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue),
    posts: this.props.posts
  };
  componentWillMount() {
    const cookie = this.getCookie("token");
    if (cookie) {
      this.setState({ token: cookie });
    }
  }
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  }

  componentDidMount() {
    if (this.props.description) {
      this.setState({ value: Value.fromJSON(this.props.description) });
    }
  }
  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        change
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        change.setBlocks("list-item").wrapBlock(type);
      }
    }

    this.onChange(change);
  };

  postContent(value) {
    const string = html.serialize(value);
    console.log(string);
    return string;
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    let deleteButton = null;
    if (this.props.deleteBool) {
      deleteButton = (
        <Button
          onClick={() => {
            this.props.del(this.props.destination, this.props.id);
            console.log(this.props.id);
          }}
          color="danger"
        >
          Delete
        </Button>
      );
    }
    return (
      <div>
        {this.renderToolbar()}
        <br />
        {this.renderEditor()}
        <br />
        {deleteButton}{" "}
        <Button
          color="primary"
          onClick={() => {
            this.props.post(
              this.state.value,
              this.postContent(this.state.value),
              this.props.destination
            );
            if (this.props.quick) {
              this.setState({ value: Value.fromJSON(initialValue) });
            }
          }}
        >
          Submit
        </Button>
        {""}
      </div>
    );
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <Row>
        <Col xs="12" className="d-flex justify-content-around ">
          {this.renderMarkButton("bold", <i className="fas fa-bold" />)}
          {this.renderMarkButton("italic", <i className="fas fa-italic" />)}
          {this.renderMarkButton(
            "underlined",
            <i className="fas fa-underline" />
          )}
          {this.renderBlockButton(
            "heading-one",
            <i className="fas fa-heading" />
          )}
          {this.renderBlockButton(
            "block-quote",
            <i className="fas fa-quote-left" />
          )}
          {this.renderBlockButton(
            "numbered-list",
            <i className="fas fa-list-ol" />
          )}
          {this.renderBlockButton(
            "bulleted-list",
            <i className="fas fa-list-ul" />
          )}
        </Col>
      </Row>
    );
  };

  /**
   * Render a mark-toggling toolbar button.

   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    let bg = "";
    if (isActive === true) {
      bg = "bg-primary";
    }
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <Col
        className={"control " + bg}
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span>{icon}</span>
      </Col>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type);
    let bg = "";
    if (isActive === true) {
      bg = "bg-primary";
    }
    const onMouseDown = event => this.onClickBlock(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <Col
        className={"control " + bg}
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span>{icon}</span>
      </Col>
    );
  };

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <Col xs="12" className="border p-5">
        <Editor
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          spellCheck
        />
      </Col>
    );
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      default:
        console.log("should never happen rich text line 466");
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = props => {
    const { children, mark } = props;
    switch (mark.type) {
      case "bold":
        return <strong>{children}</strong>;
      case "code":
        return <code>{children}</code>;
      case "italic":
        return <em>{children}</em>;
      case "underlined":
        return <u>{children}</u>;
      default:
        console.log("should never happen but does line 489 richtexteditor");
    }
  };
}

/**
 * Export.
 */

export default RichTextExample;
