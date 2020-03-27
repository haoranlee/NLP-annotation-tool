import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Intro from './components/intro';
import ArticleInfo from './components/article_info';
import Task1Intro from './components/task_1_intro';
import Task1 from './components/task_1';
import Task2Intro from './components/task_2_intro';
import Task2 from './components/task_2';
import Task3Intro from './components/task_3_intro';
import Task3 from './components/task_3';
import Task4Intro from './components/task_4_intro';
import Task4 from './components/task_4';
import ArticleComplete from './components/article_complete';
import NotFoundPage from './components/404';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/intro' component={Intro} />
                        <Route path='/article_info' component={ArticleInfo} />
                        <Route path='/task_1_intro' component={Task1Intro} />
                        <Route path='/task_1' component={Task1} />
                        <Route path='/task_2_intro' component={Task2Intro} />
                        <Route path='/task_2' component={Task2} />
                        <Route path='/task_3_intro' component={Task3Intro} />
                        <Route path='/task_3' component={Task3} />
                        <Route path='/task_4_intro' component={Task4Intro} />
                        <Route path='/task_4' component={Task4} />
                        <Route path='/article_complete' component={ArticleComplete} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;