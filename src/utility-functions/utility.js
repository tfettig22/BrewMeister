import stout from '../assets/stout.png';
import pale from '../assets/pale.png';
import red from '../assets/red.png';
import light from '../assets/light.png';
import brown from '../assets/brown.png';
import hazy from '../assets/hazy.png';

const assignImage = (beer) => {
  if (beer.name) {
    let name = beer.name.toLowerCase();
    let tagline = beer.tagline.toLowerCase();
    let description = beer.description.toLowerCase();
    determineColor(beer, name, tagline, description);
  }
}

const determineColor = (beer, name, tagline, description) => {
  if (name.includes('stout') || name.includes('porter') || name.includes('black') || tagline.includes('stout') || tagline.includes('porter') || tagline.includes('black') || description.includes('stout') || description.includes('porter') || description.includes('black')) {
    beer['image'] = stout;
  } else if (name.includes('red') || name.includes('scotch') || name.includes('strong') || name.includes('amber') || name.includes('dogma') || name.includes('wine')|| tagline.includes('red') || tagline.includes('scotch') || tagline.includes('strong') || tagline.includes('amber') || tagline.includes('wine') || description.includes('red') || description.includes('scotch') || description.includes('strong') || description.includes('amber')) {
    beer['image'] = red;
  } else if (name.includes('ipa') || name.includes('india') || name.includes('pale') || name.includes('mojito') || tagline.includes('ipa') || tagline.includes('india') || tagline.includes('pale') || description.includes('ipa') || description.includes('india') || description.includes('pale')) {
    beer['image'] = pale;
  } else if (name.includes('weisse') || name.includes('pilsner') || name.includes('lager') || name.includes('sour') || name.includes('lemon') || tagline.includes('weisse') || tagline.includes('pilsner') || tagline.includes('lager') || tagline.includes('tart') || tagline.includes('gose') || description.includes('weisse') || description.includes('pilsner') || description.includes('lager') || description.includes('light')) {
    beer['image'] = light;
  } else if (name.includes('wheat') || name.includes('hazy') || name.includes('weizen') || tagline.includes('wheat') || tagline.includes('hazy') || tagline.includes('yeast') || description.includes('wheat') || description.includes('hazy') || description.includes('saison')) {
    beer['image'] = hazy;
  } else if (name.includes('brown') || name.includes('ale') || tagline.includes('brown') || tagline.includes('ale') || tagline.includes('bock') || tagline.includes('belgian') || description.includes('brown') || description.includes('ale')) {
    beer['image'] = brown;
  } else if (!beer['image']) {
    beer['image'] = light;
  }
}

export { assignImage };