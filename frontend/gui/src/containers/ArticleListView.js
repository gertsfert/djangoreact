import React from 'react';
import axios from 'axios';

import Articles from '../components/Articles';
import CollectionsPage from '../components/CreateArticle';

class ArticleList extends React.Component {

    state = {
        articles: [],
        key: {}
    }

    updateArticles() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    articles: res.data
                });
            })
    }

    componentDidMount() {
        this.updateArticles();
    }

    handleAddArticle(article) {
        console.log('Handling added article');
        console.log(article);
        this.updateArticles();
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
                <CollectionsPage addArticle={this.handleAddArticle.bind(this)} />
            </div>
        )
    }
}

export default ArticleList;