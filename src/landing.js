import React from "react";
import demoMp4 from "./demo.mp4";
import demoWebm from "./demo.webm";
import smashing from "./avatar.smashing.jpg";
import github from "./avatar.github.jpg";
import addy from "./avatar.addy.jpg";
import cssTricks from "./avatar.css-tricks.jpg";
import { ReactComponent as ChromeLogo } from "./icons/chrome.svg";
import { ReactComponent as FirefoxLogo } from "./icons/firefox.svg";
import { ReactComponent as CliLogo } from "./icons/cli.svg";
import { ReactComponent as VsCodeLogo } from "./icons/vscode.svg";
import "./landing.css";

export default function Landing() {
  const url = `${window.location.protocol}//${window.location.host}/babel/babel/blob/master/packages/babel-core/test/browserify.js`;
  return (
    <div className="landing">
      <header
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "#222"
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          width="560"
          height="350"
          style={{
            borderRadius: "3px",
            height: "350",
            boxShadow: "0 20px 50px 0 rgba(0,0,0,0.2)"
          }}
        >
          <source src={demoWebm} type="video/webm" />
          <source src={demoMp4} type="video/mp4" />
        </video>
        <div className="summary">
          <h1>Git History</h1>
          Quickly browse the history of files in any git repo:
          <ol>
            <li>
              Go to a file in <strong>GitHub</strong> (or{" "}
              <strong>GitLab</strong>, or <strong>Bitbucket</strong>)
            </li>
            <li>
              Replace <i>github.com</i> with <i>github.githistory.xyz</i>
            </li>
            <li>There's no step three</li>
          </ol>
          <a className="button" href={url}>
            Try it
          </a>
          <p style={{ marginBottom: "7px" }}>Also available as extensions:</p>
          <div className="extensions">
            <a
              href="https://chrome.google.com/webstore/detail/github-history-browser-ex/laghnmifffncfonaoffcndocllegejnf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChromeLogo height={44} width={44} />
            </a>
            <a
              href="https://addons.mozilla.org/firefox/addon/github-history/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FirefoxLogo height={44} width={44} />
            </a>

            <a
              href="https://github.com/pomber/git-history/tree/master/cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CliLogo height={44} width={44} />
            </a>

            <a
              href="https://marketplace.visualstudio.com/items?itemName=pomber.git-file-history"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VsCodeLogo height={44} width={44} />
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <iframe
              src="https://ghbtns.com/github-btn.html?user=pomber&repo=git-history&type=star&count=true&size=large"
              title="GitHub Stars"
              frameBorder="0"
              scrolling="0"
              width="160px"
              height="30px"
            />
            <i>
              by <a href="https://twitter.com/pomber">@pomber</a>
            </i>
          </div>
        </div>
      </header>
      <Testimonies />
      <Backers />
    </div>
  );
}

function Testimonies() {
  return (
    <section style={{ margin: "45px 0px 60px", background: "#fafafa" }}>
      <h2 style={{ textAlign: "center" }}>What people are saying...</h2>
      <div className="testimonies">
        <Testimony
          name="GitHub"
          link="https://github.blog/2019-03-01-release-radar-february-2019/#git-history"
          avatar={github}
        >
          Git History caught our eye with a beautiful way to tour the history of
          a file in a GitHub repo. ... there’s nothing to download and install:
          point Git History to a repository file URL to start traveling through
          time. Great Scott!
        </Testimony>
        <Testimony
          name="Smashing Magazine"
          link="https://twitter.com/smashingmag/status/1094865325974261761"
          avatar={smashing}
        >
          Ahh you know when you need to browse your Git history but it takes a
          while to find what you are looking for? Git History lets you browse
          the history in no-time. Useful.
        </Testimony>
        <Testimony
          name="CSS-Tricks"
          link="https://twitter.com/css/status/1105999990814662656"
          avatar={cssTricks}
        >
          I love little apps like this that copy the URL structure of another
          app, so you can replace just the TLD and it does something useful.
        </Testimony>
        <Testimony
          name="Addy Osmani"
          link="https://twitter.com/addyosmani/status/1093970927413387264"
          avatar={addy}
        >
          There's something really satisfying about browsing file history with
          this timeline UI. It's super nice.
        </Testimony>
      </div>
    </section>
  );
}

function Testimony({ link, avatar, name, children }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <blockquote>
        <p>{children}</p>
        <cite style={{ display: "flex", alignItems: "center" }}>
          <img src={avatar} alt="avatar" />
          <strong style={{ paddingLeft: "10px", fontStyle: "normal" }}>
            {name}
          </strong>
        </cite>
      </blockquote>
    </a>
  );
}

function ResponsivePicture({ link, src, alt, append = "" }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <picture>
        <source
          srcSet={src + "?width=800" + append}
          media="(min-width: 900px)"
        />
        <source
          srcSet={src + "?width=600" + append}
          media="(min-width: 600px)"
        />
        <img src={src + "?width=350" + append} alt={alt} />
      </picture>
    </a>
  );
}

function Backers() {
  return (
    <section
      style={{
        padding: "28px 0px",
        background: "linear-gradient(rgba(220, 220, 220),rgba(255, 255, 255))"
      }}
      className="support"
    >
      <h2 style={{ textAlign: "center" }}>Support Git History</h2>
      <div style={{ margin: "20px auto" }}>
        <h3>Sponsors</h3>
        <p>
          Support this project by becoming a sponsor. Your logo will show up
          here with a link to your website.{" "}
          <a href="https://opencollective.com/git-history#sponsor">
            Become a sponsor
          </a>
        </p>
        <ResponsivePicture
          link="https://opencollective.com/git-history/sponsor/0/website"
          alt="sponsors"
          src="https://opencollective.com/git-history/sponsor/0/avatar.svg"
        />
        <h3>Backers</h3>
        <p>
          Thank you to all our backers!{" "}
          <span role="img" aria-label="thanks">
            🙏
          </span>
          .{" "}
          <a href="https://opencollective.com/git-history#sponsor">
            Become a backer to help us ship more features!
          </a>
        </p>
        <ResponsivePicture
          link="https://opencollective.com/git-history#backers"
          alt="Backers"
          src="https://opencollective.com/git-history/backers.svg"
        />
        <h3>Contributors</h3>
        <p>This project exists thanks to all the people who contribute.</p>

        <ResponsivePicture
          link="https://github.com/pomber/git-history/graphs/contributors"
          alt="contributors"
          src="https://opencollective.com/git-history/contributors.svg"
          append="&button=false"
        />
      </div>
    </section>
  );
}
