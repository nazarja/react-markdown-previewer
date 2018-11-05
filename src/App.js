import React, { Component } from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`;

const init =
`
# This is a Heading H1

## This is a Heading H2
  
This is an  \`Inline Code Block\`

\`\`\`javascript
This is a Multiline Code Block

const react = () => {
	console.log('React Rocks')
}
\`\`\`
  
This is  **bold** text.
This is  _italic_ text.
This is  ~~strikeout~~ text

This is a example link to [freecodecamp.com](https://www.freecodecamp.com)
> This is a Block Quote


- This is a List Item.
  

1. This is a numbered list item.


This is an embedded image:
![freecodecamp logo](https://s3.amazonaws.com/freecodecamp/favicons/favicon-96x96.png)
`

/**
 *  Header
  */
const Header = () => {
	return (
		<div>
			<h1 id="heading">React Markdown Editor &amp; Preview</h1>
		</div>
	)
};

class Options extends Component {
	render() {
		const options = [
			['\n# Heading H1\n', 'H1'], ['\n## Heading H2\n', 'H2'], ['\n### Heading H3\n', 'H3'], ['\n**Bold**\n', 'Bold'], ['\n*Italic*\n', 'Italic'], ['\n~~Strikethrough~~\n', 'Strikethrough'], ['\r\n---\r', 'Horizontal Rule'],
			['\n`Code`\n', 'Code'], ['\n```javascript\nCode Block\n```\n', 'Code Block'], ['\n[Link-Name](http://example.com/)\n', 'Link'], ['\n- List Item\n', 'List Item'], ['\n1. Numbered List\n', 'Numbered List'],
			['\n> Quote \n', 'Quote'], ['\n![alt-text](https://s3.amazonaws.com/freecodecamp/favicons/favicon-96x96.png)\n', 'Image'], ['\n[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)\n', 'Video']
		]
		return (
			<div id="options">
				{
					options.map((item, i) => {
						return <button key={i} onClick={ () => this.props.insert(item[0])}>{item[1]}</button>
					})
				}
			</div>
		);
	}
}

/**
 *  Editor
  */
class Editor extends Component {
	render() {
		return (
			<div className="edit-preview-div">
				<h2 className="h2-title">Markdown Editor</h2>
				<button onClick={this.props.clear}>Clear</button>
				<textarea id="editor" value={this.props.input} onChange={this.props.handleChange} type="text"></textarea>
			</div>
		);
	}
}

/**
 *  Preview
  */
class Preview extends Component {
	render() {
		return (
			<div className="edit-preview-div">
				<h2 className="h2-title">Markdown Previewer</h2>
				<div id="preview" dangerouslySetInnerHTML={this.props.markdown}></div>
			</div>
		);
	}
}

/**
 *  Footer
  */
const Footer = () => {
	return (
		<div className="footer">
			<p>Design and Code by - <a href="http://seanmurphy.eu/" target="_blank" rel="noopener noreferrer">Sean Murphy</a> -</p>
		</div>
	);
}



/**
 *  Export App
  */
class App extends Component {

	constructor() {
		super();

		this.state = {
			input: init
		}

		this.handleChange = this.handleChange.bind(this);
		this.markdown = this.markdown.bind(this);
		this.insert = this.insert.bind(this);
		this.clear = this.clear.bind(this);
	}


	handleChange(event) {
		this.setState({
			input: event.target.value
		})
	}

	markdown() {
		const options = {
			gfm: true,
			sanitize: true,
			breaks: true,
			smartpants: true,
			renderer: renderer
		};

		return { __html: marked(this.state.input, options) }
	}

	insert(option) {
		this.setState({
			input: this.state.input + option
		})
	}

	clear() {
		this.setState({
			input: ''
		})
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Options insert={this.insert}/>
				<Editor input={this.state.input} handleChange={this.handleChange} clear={this.clear}/>
				<Preview markdown={this.markdown()}/>
				<Footer />
			</div>
		);
	}
}
export default App;
