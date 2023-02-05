# korean-fortunes

A collection of Korean idioms and their definitions, extracted from [Wikiquote](https://ko.wikiquote.org/wiki/%ED%95%9C%EA%B5%AD_%EC%86%8D%EB%8B%B4), for use with derivatives of the UNIX `fortune` program.

## Examples

````text
$ fortune korean
“우물을 파도 한 우물을 파라”
    어떤 일을 할 때는 한 가지 일을 끝까지 열심히 해야 성공할 수 있다는 뜻.
$ fortune korean
“꿩 대신 닭이다”
    꼭 필요한 것이 없을 때 그와 비슷한 것으로 대신할 수 있다는 뜻.
$ fortune korean
“털도 안 뜯고 먹겠다 한다”
    몹시 성급하게 하려고 덤빈다는 뜻으로, 남의 물건을 통째로 먹으려 할 때도 쓰임.
$ fortune korean
“구렁이 담 넘어가듯 한다”
    일의 끊고 맺음을 확실히 하지않고 슬그머니 얼버무리고 대강 지나갈 경우에 쓰는 말.
````

## Installation

For use with [fortune-mod](https://github.com/shlomif/fortune-mod) on Linux, all you need to do is get the files `korean` and `korean.dat` into your `/usr/share/games/fortune/` directory.

On Fedora, you might use the following commands:

````bash
# Install fortune-mod, if you don't have it already
sudo dnf install fortune-mod
# Clone this repo and cd into its directory
git clone https://github.com/maxkapur/korean-fortunes.git
cd korean-fortunes
# Copy the data files into your fortunes source
sudo cp -t /usr/share/games/fortune/ korean korean.dat
# Remove the repo if you don't want it anymore
cd ..
rm -rf korean-fortunes
````
Or you could symlink from `/usr/share/games/fortune/` instead:

````bash
# Install fortune-mod, if you don't have it already
sudo dnf install fortune-mod
# Clone this repo and cd into its directory
git clone https://github.com/maxkapur/korean-fortunes.git
cd korean-fortunes
# Symlink the data files into your fortunes source
sudo ln -s "$(pwd)/korean" /usr/share/games/fortune/korean
sudo ln -s "$(pwd)/korean.dat" /usr/share/games/fortune/korean.dat
````

Now you should see `korean` listed in your fortune sources:

````text
$ fortune -f
100.00% /usr/share/games/fortune
    ...
     0.55% hitchhiker
     1.21% humorists
     0.92% kids
     3.29% knghtbrd
     1.88% korean           ← success!
     1.26% law
     2.44% linux
     1.60% literat
    ...
````

Since the fortune source directory differs from distribution to distribution,
you may need to modify the commands above. For example, Arch uses
`/usr/share/fortune/` instead of `/usr/share/games/fortune/`. You can
determine which directory fortune checks by running `fortune -f`.

## Fish greeting

I use a random Korean fortune as my greeting in the fish shell. The script `fish_greeting.fish`
prints a fortune with a little bit of colorful styling. You can set this as your fish greeting
by running, from the `korean-fortunes` directory

````bash
cp fish_greeting.fish ~/.config/fish/functions/fish_greeting.fish
````

(to copy), or

````bash
ln -s "$(pwd)/fish_greeting.fish" ~/.config/fish/functions/fish_greeting.fish
````

(to symlink).

## Hacker stuff

See the `src/` directory for the HTML and Javascript used to make the `korean` fortune file.

- `src/index.html` is the product of manually removing extraneous elements from the Wikiquote source (doing this with Emmet tools proved a more efficient use of time than scripting them out).
- `src/script.js` attaches to `src/index.html`, scans the list into object representations (accounting for the source’s inconsistent formatting), and replaces the body with a `pre` element whose contents I copy-pasted to `korean`.
- The `korean.dat` file is created using `strfile -c % korean`.

## Legal stuff

MIT license.

By [Max Kapur](https://maxkapur.com).
