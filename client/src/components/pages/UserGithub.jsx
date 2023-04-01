import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function UserGithub({username}) {
    const [userRepo, SetUserRepo] = useState({
        clientId: '471d6a45e3a01471f249',
        clientSecret: 'eebf10b43de015181e403ba552d785e4efb42f1a',
        count: 5,
        sort: 'created: asc',
        repos: []
    })
    const { count, sort, clientId, clientSecret,repos } = userRepo
    const getUserRepo = () =>{
        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
          )
            .then(res => res.json())
            .then(data => {
                SetUserRepo({ repos: data });
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getUserRepo()
    }, [])
    let repoItems = ''
    if(repos.message !== "Not Found"){
       repoItems = repos.map(repo => {
        return(
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      )});
    }else{
      repoItems = ''
    }
    

    return (
        <div target="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
        </div>
    )
}

export default UserGithub
