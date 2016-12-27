# is-satire
A semi-useful tool for the browser or command line to determine if a website is satirical/fake or actually legitimate.

Works in `node.js` (see `lib/`), the `browser` (see `build/`) and as a `cli` utility (`is-satire`), all-in-one!

# Algorithm
* Check URL against list of known satire sites,
* If not found in list:
    * Perform fingerprint match:
        1. Check target against predefined list of interested URI paths,
        2. for each found (200 OK) path:
            * Check path against predefined list of interesting keywords,
            * For each found keyword:
                1. Record `n=n+1`, representing likelihood that target is satire 

## Accuracy

This utility first matches a target URI against a predefined list of known satire sites, before attempting to match against a predefined list of common URI paths, which may disclose evidence of satirical content. Presently, there is no scientific merit behind this algorithm, therefore accuracy cannot be determined. 

# Contribute!

It's not an exact science, but seems to get pretty accurate results. The blacklist is pretty comprehensive, so if you get to the scan part, definitely submit a pull request with your results!

# CLI
## Pre 2.0
```js
is-satire http://www.wonkette.com
```
```
checking www.wonkette.com...
Found Keywords: humor, parody, publication, satire, parody, publication, satire, parody, publication, satire
there's a strong likelihood that this is a satire site.
```

## 2.0

> `is-satire` 2.0 provides more explicit output, allowing the user to encourage curiosity, in determining whether or not the target is satire.

```
is-satire [-f force] <-t target>
is-satire -t christwire.org
is-satire -f -t christwire.org
```

```
checking christwire.org...
*** trying christwire.org /
*** path { keywordsFound: [], path: '/' }
*** trying christwire.org /about
*** trying christwire.org /about-us
*** trying christwire.org /aboutus
*** trying christwire.org /contact
*** trying christwire.org /disclaimer
*** trying christwire.org /faq
*** trying christwire.org /frequently-asked-questions
*** path { keywordsFound: [ 'invented', 'publication', 'satirical', 'satirize' ],
  path: '/frequently-asked-questions' }
```

# Satire

## Satire, Hoaxes and Clickbait
> News satire, also called fake news, is a type of parody presented in a format typical of mainstream journalism, and called a satire because of its content.

### Satire
Satire is content that is overly exaggerated and meant to be funny and ridiculous, having possibility of being misinterpreted as factual; sources such as TheOnion.com.

### Hoaxes
Fake and/or hoaxed content is satire that is pushed as actual news, possibly aimed at targeting a more gullible audience; sources such as MediaMass.net.

### Clickbait
Clickbait is content originating from factual content, interlaced with fiction, to encourage fear and conspiracy; sources such as BeforeItsNews.com.

## Fun Facts
- One of the earliest examples of what we might call satire, [The Satire of the Trades](https://en.wikipedia.org/wiki/The_Satire_of_the_Trades), is in Egyptian writing from the beginning of the 2nd millennium BC. The text's apparent readers are students, tired of studying. It argues that their lot as scribes is useful, and their lot far superior to that of the ordinary man. Scholars such as Helck think that the context was meant to be serious. [cite](https://en.wikipedia.org/wiki/Satire#Development)
- Of the first known accounts of journalistic satirism, in 1835, Richard A. Locke successfully increased sales of The Sun newspaper by publishing a series of six articles, now known as the Great Moon Hoax, under the name of contemporary astronomer Sir John Herschel. [cite](https://en.wikipedia.org/wiki/Great_Moon_Hoax)
- The word "courant" (*hint* The Daily Currant *giggle*) is an obsolete term for "newspaper." The word was also used in British English dialect to refer to enacting in gossiping. [cite](https://en.wiktionary.org/wiki/courant)
- Like "courant", "herald" (*hint* Boston Herald) historically refers to an officer with the status of ambassador acting as official messenger between leaders especially in war; one that conveys news. [cite](http://www.merriam-webster.com/dictionary/herald)
