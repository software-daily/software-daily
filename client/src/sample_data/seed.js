/* eslint-disable */
'use strict';
const fs = require('fs');
const jsonfile = require('jsonfile');
const moment = require('moment');
const path = require('path');
const _ = require('lodash');

const postsByTag = [
  {
    tag: 'javascript',
    posts: [
      {
        title: 'A spreadsheet in fewer than 30 lines of JavaScript, no library used',
        sourceUrl: 'http://jsfiddle.net/ondras/hYfN3/',
        commentBodies: [
          'This sounds too good to be true.. What\'s the browser support?',
          'I think it\'s just a proof of concept. Most likely just latest browsers.'
        ]
      },
      {
        title: 'Show HN: Meteor, a realtime JavaScript framework',
        sourceUrl: 'http://www.meteor.com/',
        commentBodies: [
          'Very cool'
        ]
      },
      {
        title: 'Tearable Cloth Simulation in JavaScript',
        sourceUrl: 'http://codepen.io/stuffit/pen/KrAwx',
        commentBodies: []
      },
      {
        title: 'Chosen: A javascript plug-in that makes long select boxes user-friendly.',
        sourceUrl: 'http://harvesthq.github.com/chosen',
        commentBodies: []
      }
    ]
  },
  {
    tag: 'golang',
    posts: [
      {
        title: 'Go Lang: Comments Are Not Directives',
        sourceUrl: 'https://news.ycombinator.com/item?id=9522973',
        commentBodies: [
          'But what about Angular directives? :|'
        ]
      },
      {
        title: 'The Way of the Gopher: Making the Switch from Node.js to Golang',
        sourceUrl: 'https://medium.com/@theflapjack103/the-way-of-the-gopher-6693db15ae1f',
        commentBodies: [
          'It will be interesting to see how long Node sticks around for, considering the fact that JavaScript is not a real programming language oO'
        ]
      },
      {
        title: 'Golang on GitHub',
        sourceUrl: 'https://github.com/golang/go',
        commentBodies: []
      },
      {
        title: 'A little Golang way',
        sourceUrl: 'https://www.aerofs.com/blog/a-little-golang-way/',
        commentBodies: []
      },
      {
        title: 'Problems with the Golang runtime and toolchain',
        sourceUrl: 'http://dtrace.org/blogs/wesolows/2014/12/29/golang-is-trash/',
        commentBodies: [
          'Good article'
        ]
      }
    ]
  },
  {
    tag: 'firebase',
    posts: [
      {
        title: 'Firebase is Joining Google',
        sourceUrl: 'https://www.firebase.com/blog/2014-10-21-firebase-joins-google.html',
        commentBodies: [
          '+1'
        ]
      },
      {
        title: 'Firebase expands to become a unified app platform',
        sourceUrl: 'https://firebase.googleblog.com/2016/05/firebase-expands-to-become-unified-app-platform.html',
        commentBodies: []
      },
      {
        title: 'Show HN: Firebase, a scalable real-time backend',
        sourceUrl: 'http://firebase.com/',
        commentBodies: []
      }
    ]
  },
  {
    tag: 'kafka',
    posts: [
      {
        title: 'Heroku Kafka',
        sourceUrl: 'https://www.heroku.com/kafka',
        commentBodies: []
      },
      {
        title: 'The most Kafkaesque paragraph from today\'s NSA ruling',
        sourceUrl: 'http://www.washingtonpost.com/blogs/the-switch/wp/2013/12/27/the-most-kafkaesque-paragraph-from-todays-nsa-ruling/',
        commentBodies: []
      },
      {
        title: 'Apache Kafka, Samza, and the Unix Philosophy of Distributed Data',
        sourceUrl: 'http://www.confluent.io/blog/apache-kafka-samza-and-the-unix-philosophy-of-distributed-data',
        commentBodies: []
      },
      {
        title: 'Apache Kafka – Publish-subscribe messaging rethought as a distributed commit log',
        sourceUrl: 'https://kafka.apache.org/',
        commentBodies: [
          'Love Kafka. We\'re using it on my team - anyone else?',
          'Our team is considering switching from SQS to Kafka for our main data pipeline. Would be curious to hear other people\'s opinions of it.',
          'I have only heard good things'
        ]
      },
      {
        title: 'Apache Kafka 0.9 is released',
        sourceUrl: 'http://www.confluent.io/blog/apache-kafka-0.9-is-released',
        commentBodies: []
      },
      {
        title: 'Spotify\'s Kafka-Based Event Delivery System',
        sourceUrl: 'https://labs.spotify.com/2016/02/25/spotifys-event-delivery-the-road-to-the-cloud-part-i/',
        commentBodies: [
          'Welp. If Spotify\'s using it...'
        ]
      }
    ]
  },
  {
    tag: 'rust',
    posts: [
      {
        title: 'Announcing Rust 1.0 Alpha',
        sourceUrl: 'http://blog.rust-lang.org/2015/01/09/Rust-1.0-alpha.html',
        commentBodies: []
      },
      {
        title: 'Redox – A Unix-Like Operating System Written in Rust',
        sourceUrl: 'http://www.redox-os.org/',
        commentBodies: []
      },
      {
        title: 'Rust for Python Programmers',
        sourceUrl: 'http://lucumr.pocoo.org/2015/5/27/rust-for-pythonistas/',
        commentBodies: []
      },
      {
        title: 'A Rust Contributor Tries Their Hand at Go',
        sourceUrl: 'http://www.polyglotweekly.com/2015/04/24/thoughts-of-a-rustacean-learning-go.html',
        commentBodies: []
      }
    ]
  },
  {
    tag: 'docker',
    posts: [
      {
        title: 'Docker for Mac and Windows Beta',
        sourceUrl: 'https://blog.docker.com/2016/03/docker-for-mac-windows-beta/',
        commentBodies: [
          'Much needed +1'
        ]
      },
      {
        title: 'Docker, CoreOS, Google, Microsoft, Amazon to Develop Common Container Standard',
        sourceUrl: 'http://techcrunch.com/2015/06/22/docker-coreos-google-microsoft-amazon-and-others-agree-to-develop-common-container-standard/',
        commentBodies: []
      }
    ]
  },
  {
    tag: 'rest',
    posts: [
      {
        title: 'Nobody Understands REST or HTTP',
        sourceUrl: 'http://blog.steveklabnik.com/2011/07/03/nobody-understands-rest-or-http.html',
        commentBodies: [
          'Well, I sure don\t.'
        ]
      },
      {
        title: 'PostgREST – REST API from any PostgreSQL database',
        sourceUrl: 'https://github.com/begriffs/postgrest',
        commentBodies: []
      },
      {
        title: 'What is your go-to example for a good REST API?',
        sourceUrl: 'https://news.ycombinator.com/item?id=11971491',
        commentBodies: []
      },
      {
        title: 'Oboe.js: reacting to Ajax/Rest quicker by not waiting for it to finish',
        sourceUrl: 'https://github.com/jimhigson/oboe.js',
        commentBodies: []
      }
    ]
  },
  {
    tag: 'react.js',
    posts: [
      {
        title: 'React JS Best Practices',
        sourceUrl: 'http://blog.siftscience.com/blog/2015/react-applications-that-scale',
        commentBodies: []
      },
      {
        title: 'The Case for React.js and ClojureScript',
        sourceUrl: 'http://murilopereira.com/the-case-for-reactjs-and-clojurescript',
        commentBodies: []
      },
      {
        title: 'Why you might not need MVC with React.js',
        sourceUrl: 'http://www.code-experience.com/why-you-might-not-need-mvc-with-reactjs/',
        commentBodies: []
      },
      {
        title: 'React.js three renderer example',
        sourceUrl: 'http://toxicfork.github.io/react-three-renderer-example/',
        commentBodies: []
      },
      {
        title: 'Pros and Cons of using immutability with React.js',
        sourceUrl: 'http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/',
        commentBodies: [
          'Sometimes it\'s frustrating to not be able to use lodash/etc. without converting to JS and back'
        ]
      }
    ]
  },
  {
    tag: 'hadoop',
    posts: [
      {
        title: 'Making PostgreSQL Scale Hadoop-style: Benchmark Numbers',
        sourceUrl: 'http://www.citusdata.com/blog/86-making-postgresql-scale-hadoop-style',
        commentBodies: []
      },
      {
        title: 'The Dark Side of Hadoop',
        sourceUrl: 'http://tech.backtype.com/the-dark-side-of-hadoop',
        commentBodies: []
      },
      {
        title: 'Amazon Redshift is 10x faster and cheaper than Hadoop and Hive',
        sourceUrl: 'http://www.slideshare.net/Hapyrus/amazon-redshift-is-10x-faster-and-cheaper-than-hadoop-hive',
        commentBodies: []
      }
    ]
  }
];

const randomTimestamp = (function() {
  const start = new Date(2014, 0, 0);
  const end = new Date();
  return () => {
    return moment(
      new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    ).format();
  };
})();

const tags = (function() {
  let id = 1;
  return postsByTag.reduce((acc, curr) => {
    acc.push({
      id: id++,
      createdAt: randomTimestamp(),
      text: curr.tag
    });
    return acc;
  }, []);
})();

const users = (function() {
  const userAccounts = [
    {
      username: 'jtribble',
      twitter: 'jeffwtribble'
    },
    {
      username: 'ashitlerferad',
      twitter: undefined
    },
    {
      username: 'adamnemecek',
      twitter: 'adamnemecek'
    },
    {
      username: 'ingve',
      twitter: undefined
    },
    {
      username: 'andars',
      twitter: undefined
    },
    {
      username: 'based2',
      twitter: undefined
    },
    {
      username: 'ColinWright',
      twitter: undefined
    },
    {
      username: 'NickLarsen',
      twitter: undefined
    },
    {
      username: 'telecomix',
      twitter: 'telecomix'
    },
    {
      username: 'hitr',
      twitter: undefined
    },
    {
      username: 'dnetesn',
      twitter: 'dnetesn'
    },
    {
      username: 'nadahalli',
      twitter: 'nadahalli'
    },
    {
      username: 'Aloisius',
      twitter: 'Aloisius'
    },
    {
      username: 'jmngomes',
      twitter: 'jmngomes'
    },
    {
      username: 'spathak',
      twitter: undefined
    },
    {
      username: 'isp',
      twitter: undefined
    },
    {
      username: 'ranvir',
      twitter: undefined
    },
    {
      username: 'hrisp',
      twitter: undefined
    },
    {
      username: 'mischa_u',
      twitter: undefined
    },
    {
      username: 'justinweiss',
      twitter: 'justinweiss'
    },
    {
      username: 'ghotli',
      twitter: undefined
    },
    {
      username: 'irunbackwards',
      twitter: 'irunbackwards'
    },
    {
      username: 'ssclafani',
      twitter: 'ssclafani'
    }
  ];
  let id = 1;
  return userAccounts.map(userAccount => {
    return {
      id: id++,
      createdAt: randomTimestamp(),
      twitter: userAccount.twitter,
      username: userAccount.username
    };
  });
})();

const randomUserId = () => {
  return _.sample(users).id;
};

const posts = (function() {
  let id = 1;
  return _.sortBy(postsByTag.reduce((acc, curr) => {
    const tag = _.find(tags, {text: curr.tag});
    curr.posts.forEach(post => {
      acc.push({
        id: id++,
        createdAt: randomTimestamp(),
        title: post.title,
        sourceUrl: post.sourceUrl,
        authorId: randomUserId(),
        commentIds: [],
        tagIds: [tag.id]
      })
    });
    return acc;
  }, []), 'createdAt').reverse();
})();

const comments = (function() {
  let id = 1;
  return postsByTag.reduce((acc, curr) => {
    curr.posts.forEach(post => {
      post.commentBodies.forEach(commentBody => {
        const realPost = _.find(posts, {sourceUrl: post.sourceUrl});
        realPost.commentIds.push(id);
        acc.push({
          id: id++,
          createdAt: randomTimestamp(),
          postId: realPost.id,
          parentId: null,
          authorId: randomUserId(),
          body: commentBody
        });
      });
    });
    return acc;
  }, []);
})();

const commentsFilePath = path.resolve(__dirname, 'comments.json');
jsonfile.writeFile(commentsFilePath, comments, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Successfully wrote ${comments.length} seed comments to ${commentsFilePath}`);
});

const postsFilePath = path.resolve(__dirname, 'posts.json');
jsonfile.writeFile(postsFilePath, posts, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Successfully wrote ${posts.length} seed posts to ${postsFilePath}`);
});

const tagsFilePath = path.resolve(__dirname, 'tags.json');
jsonfile.writeFile(tagsFilePath, tags, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Successfully wrote ${tags.length} seed tags to ${tagsFilePath}`);
});

const usersFilePath = path.resolve(__dirname, 'users.json');
jsonfile.writeFile(usersFilePath, users, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Successfully wrote ${users.length} seed users to ${usersFilePath}`);
});
