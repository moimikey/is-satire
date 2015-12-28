# is-satire
A semi-useful tool for the browser or command line to determine if a website is satirical/fake or actually legitimate.

**NOTE** This is still in Alpha stages and is not ready for use yet. I'm expecting the first release in January/February 2016.

# Features
- pre-determined list of satirical content sources
- loose satirical content detection

# Satire, Hoaxes and Clickbait
> News satire, also called fake news, is a type of parody presented in a format typical of mainstream journalism, and called a satire because of its content.

## Satire
Satire is content that is overly exaggerated and meant to be funny and ridiculous, having possibility of being misinterpreted as factual; sources such as TheOnion.com.

## Hoaxes
Fake and/or hoaxed content is satire that is pushed as actual news, possibly aimed at targeting a more gullible audience; sources such as MediaMass.net.

## Clickbait
Clickbait is content originating from factual content, interlaced with fiction, to encourage fear and conspiracy; sources such as BeforeItsNews.com.

# Fun Facts
Of the first known accounts of journalistic satirism, in 1835, Richard A. Locke successfully increased sales of The Sun newspaper by publishing a series of six articles, now known as the Great Moon Hoax, under the name of contemporary astronomer Sir John Herschel. [cite](https://en.wikipedia.org/wiki/Great_Moon_Hoax)

The word "courant" (*hint* The Daily Currant *giggle*) is an obsolete term for "newspaper." The word was also used in British English dialect to refer to enacting in gossiping. [cite](https://en.wiktionary.org/wiki/courant)

Like "courant", "herald" (*hint* Boston Herald) historically refers to an officer with the status of ambassador acting as official messenger between leaders especially in war; one that conveys news. [cite](http://www.merriam-webster.com/dictionary/herald)

# Examples
```js
./is-satire http://somesite.com
_ is not a known satire site, but displays characteristics of a satire site!

If you'd like to submit this to `is-satire` please type `y` and we'll transmit
this fingerprint behind the scenes.

./is-satire http://othersite.com
_ is a known satire site!

./is-satire http://yetanothersite.com
_ is **not** a known satire site.
```
