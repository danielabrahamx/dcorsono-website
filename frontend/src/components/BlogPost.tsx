import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';

interface BlogPostData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishedAt: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // For now, hardcoded posts - later this will come from API
  const getPostData = (postId: string): BlogPostData => {
    switch (postId) {
      case '1':
        return {
          title: "Wisdom for Healing from Trauma",
          content: `During my attempts at shadow work, trying to relieve myself of trauma, I found myself going in circles while trying to make sense of really difficult things. In my desperate search for comforting wisdom out of all the bullshit, I finally hit a breakthrough: We give WAYY too much credit to people who have hurt us. We treat them as conscious actors making deliberate choices, when they were simply unconscious vessels passing on their programming.

If this helps even one person, it's worth sharing.

So basically
Whether you're spiritual, religious, or an atheist, no one can argue that we are all animated beings. We have nearly identical brains, differing only by minor variations in structure. Our internal systems are very similar. Where we differ is more about what we choose to hold about ourselves - like what programs and pictures we decide to have on our computers, despite maybe a bunch of people having the same MacBook.

Countless experiments prove that a brain can be deeply conditioned by external stimuli, even when the owner of the brain isn't aware of it. We can be controlled and manipulated to act according to someone else's will. It happens constantly, in both friendly and hostile ways. Often, even after the original conditioning/controller has left the picture, we continue acting out the same programming. The majority of thoughts we have each day are identical to the day before. It requires will - consciousness - to break that static.

This consciousness is showing up more and more, but it's still rare. Most people are essentially zombified, acting out their programming, their trauma, their shadow self (the shield they developed in their personality to protect them from suspected harm). Then they have relationships and kids and pass on that same programming and trauma, because that's what they think is right in the moment. That's literally just their program running.

Sometimes it helps me to see each individual as a collection of forces. We are all channeling specific forces at any point in time - either by our will or the will of who/what we've enslaved ourselves to.

This is where everything clicked for me about people who have wronged us.

If most people are unconscious, running on programming, then perhaps we give them too much credit. We still believe they were acting out of their own autonomy, making real choices, when they were simply being manipulated by the forces of their conditioning. They were passing on their trauma and programming because they weren't conscious enough to do anything better. They’re too weak-willed to free themselves. Poor them but not really, this is kinda controversial but it helps me to see them as less alive. The only proof of life (for me) is consciousness.

I know we like to take things personally: "How could they do this to me? I don't get it. I would never do this to anyone."

But that wasn't a conscious individual you were dealing with. It was a collection of traumas and faulty beliefs, fed into a psyche to create a personality that runs on autopilot until they decide to change. This is also why we can't change anyone - it requires an internal consciousness to break free from your programming.

From a higher perspective, we are traumatized by invisible forces that take hold of people. This force benefits from keeping you traumatized, because now it can live in you and spread itself further. It has an intelligence of its own. That is the nature of this reality.

But there's so much light at the end of the tunnel: if trauma is less personal - if it never actually had anything to do with you - then you can reclaim your diminished self-worth. You can choose not to participate in the trauma transfer process. You can step out of the loop, step out of the cycle, and see the forces that are truly running it from an enlightened point of view. That’s where your freedom is. Outside of the loops. Now you can go do whatever you want, you choose what forces take hold over you. I choose for my vessel to hold unconditional love, authenticity, curiosity and deep passion. 

The person who hurt you wasn't really there. They were possessed by old programming. And now you get to choose whether that programming possesses you too, or whether you break the cycle. Stay the fuck away from zombies, just have compassion for their solar essence if you MUST stay around them.

We can use this newfound perspective as light, and shine to it upon ourselves to see: “Where in my life am I half-conscious, on autopilot; where in my life am I a zombie?” A continuous iteration of rewiring ourselves.

This catapulted me into liberation.`,
          excerpt: "A breakthrough perspective on healing from trauma: understanding that those who hurt us are often unconscious vessels passing on their programming, not conscious actors making deliberate choices.",
          author: "Daniel Abraham",
          categories: ["Consciousness", "Healing", "Trauma"],
          publishedAt: new Date().toLocaleDateString()
        };
      default:
        return {
          title: "Post Not Found",
          content: "The requested blog post could not be found.",
          excerpt: "",
          author: "",
          categories: [],
          publishedAt: ""
        };
    }
  };

  const post = getPostData(id || '1');

  return (
    <div className="blog-post-page">
      <main className="main-content">
        <div className="container">
          <motion.article
            className="blog-post"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="blog-post-header">
              <h1 className="blog-post-title">{post.title}</h1>
            </header>

            <div className="blog-post-content">
              <div className="content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;