import AnimatedSection from "./AnimatedSection";
import Container from "./Container";

const About = ({ darkmode }) => (
  <section
    id="about"
    className="bg-gray-50 py-16 transition-colors dark:bg-slate-900 md:py-20"
  >
    <Container>
      <AnimatedSection>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6 flex items-center justify-center">
              {darkmode ? (
                <img
                  src="https://res.cloudinary.com/dmlwjfjra/image/upload/v1772780945/avatar2_rwk0xa.png"
                  alt="About Me"
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dmlwjfjra/image/upload/v1772780969/avatar1_gwmvyr.png"
                  alt="About Me"
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
                />
              )}
            </div>

            <h2 className="mb-5 text-center text-2xl font-bold sm:text-3xl">
              About Me
            </h2>

            <p className="max-w-2xl text-justify leading-relaxed text-gray-600 dark:text-gray-300">
              I am an Information Science student and a passionate full-stack
              developer who enjoys building real-world web applications. I work
              with technologies like Java, JavaScript, React, Node.js, and
              Python to create scalable and user-friendly products. I am always
              eager to learn new tools and improve my skills in web development,
              cloud, and Web3 while creating solutions that solve real problems.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
            {darkmode ? (
              <img
                src="https://res.cloudinary.com/dmlwjfjra/image/upload/v1772786039/13_yj126n.png"
                alt="About Me"
                className="h-auto w-full object-cover"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dmlwjfjra/image/upload/v1772786038/12_fy1s3b.png"
                alt="About Me"
                className="h-auto w-full object-cover"
              />
            )}
          </div>
        </div>
      </AnimatedSection>
    </Container>
  </section>
);
export default About;
