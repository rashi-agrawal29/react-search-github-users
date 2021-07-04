import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} =  useContext(GithubContext);
  const languages = repos.reduce((total, item)=>{
    const { language, stargazers_count } = item;
    if(!language) return total; //if language is null don't return it
    if(!total[language]) {
      total[language] = {label:language, value: 1, 
        stars: stargazers_count } //if language not on object create instance with value 1
    }
    else {
      total[language]= {
        ...total[language], 
        value:total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }; //if language is on object increase value by 1
    }
    
    return total;
  }, {});

  const mostUsed = Object.values(languages).
  sort((a,b)=> {
    return b.value - a.value; //makes sure we get highest value language first
  })
  .slice(0,5); // get only first 5 most popular languages

  //most stars per language

  const mostPopular = Object.values(languages).
  sort((a,b)=> {
    return b.stars - a.stars;
  }).map((item)=>{
    return {...item, value: item.stars};
  }).slice(0,5);
  

  // stars, forks

  let {stars,forks} = repos.reduce((total,item)=>{
    const {stargazers_count,name,forks}= item;
    total.stars[stargazers_count]= {label:name, 
      value: stargazers_count};

      total.forks[forks]= {lable:name, value: forks}
      return total;
  }, 
    {
    stars:{}, forks:{}
     }
  );

  //an array of stars to display top 5 repos with highest stars high to low

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  const chartData = [
  {
    label: "HTML",
    value: "29"
  },
  {
    label:"CSS",
    value: "80"
  },
  {
    label: "JavaScript",
    value: "160"
  },
];
  return (
  <section className="section">
    <Wrapper className="section-center">
      {/* <ExampleChart data={chartData}/>; */}
      <Pie3D data={mostUsed} />
      <Column3D data={stars}/>
      <Doughnut2D data={mostPopular}/>
      <Bar3D data={forks}/>
    </Wrapper>
  </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  // make chart responsive using below css
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
