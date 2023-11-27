async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

    const learnerRes = await axios.get('http://localhost:3003/api/learners');
    const mentorsRes = await axios.get('http://localhost:3003/api/mentors');
    const learners = learnerRes.data;
    const mentors = mentorsRes.data;

    console.log('Data from learners: ', learners)
    console.log('Mentors: ', mentors)

     const finalLearners = learners.map((learner) =>{
     return {
       ...learner,
      mentors: mentors.filter((mentor) => learner.mentors.includes(mentor.id)),
    };
   });
      //console.log(learnerCard)

     document.querySelector('.info').textContent = 'No learner is selected';

     const cardSection = document.querySelector('.cards');
     for(let learner of finalLearners){
      const learnerCard = createLearnerCard(learner);
      cardSection.appendChild(learnerCard);
     }
    }
     function createLearnerCard(learner){
      const info = document.querySelector('.info');
      const div = document.createElement('div');
      div.classList.add('card');
      const h3 = document.createElement('h3');
      h3.textContent = learner.fullName;
      const otherDiv = document.createElement('div');
      otherDiv.textContent = learner.email;
      const h4 = document.createElement('h4');
      h4.classList.add('closed');
      h4.textContent = 'Mentors';
      h4.addEventListener('click', (e)=>{
        if(div.classList.contains('selected')){
          e.stopPropagation();
        }
        h4.classList.toggle('closed');
        h4.classList.toggle('open');
      })
    
    const ul =document.createElement('ul');
      for(let mentor of learner.mentors){
        const li = document.createElement('li');
        li.textContent = `${mentor.firstName} ${mentor.lastName}`;
        ul.appendChild(li);
      }

    div.appendChild(h3);
    div.appendChild(otherDiv);
    div.appendChild(h4);
    div.appendChild(ul);

    div.addEventListener('click', ()=>{
      //console.log(learner)
      const cards = document.querySelectorAll('.card');
      const isSelected = div.classList.contains('selected');

      for(let card of cards){
        card.classList.remove('selected');
        const name = card.querySelector('h3');
        name.textContent = name.textContent.split(',')[0];
      }
      if(!isSelected){
        div.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`;
        h3.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        info.textContent = 'No learner is selected';
        h3.textContent = learner.fullName;
      }
    });

    return div;
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
