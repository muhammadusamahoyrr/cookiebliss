import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import ReviewGrid from '@/components/testimonials/ReviewGrid'; 
// Sample reviews data
const sampleReviews = [
  {
    id: '1',
    text: 'These cookies are absolutely divine! The chocolate chip ones remind me of my grandmother\'s recipe but even better. Perfect balance of crispy edges and chewy centers with just the right amount of chocolate.',
    author: {
      name: 'Sarah Johnson',
      initials: 'SJ'
    },
    rating: 5,
    date: '2 days ago',
    verified: true
  },
  {
    id: '2',
    text: 'The oatmeal raisin cookies were perfect - not too sweet and incredibly soft. My kids absolutely loved them and they disappeared in minutes! Will definitely be ordering again for our weekly family movie nights.',
    author: {
      name: 'Michael Rodriguez',
      initials: 'MR'
    },
    rating: 4.5,
    date: '1 week ago',
    verified: true
  },
  {
    id: '3',
    text: 'I ordered these for a company event and everyone was impressed! The presentation was beautiful and the taste was exceptional. The variety pack was a hit - something for everyone. Customer service was outstanding too!',
    author: {
      name: 'Emma Wilson',
      initials: 'EW'
    },
    rating: 5,
    date: '3 days ago',
    verified: true
  }
];

export default function TestimonialsPage() {
  return (
    <main>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <SectionHeader
          title="Sweet Words From Our Customers"
          subtitle="Don't just take our word for it - hear what our cookie lovers have to say!"
          highlightWord="Sweet"
        />
        
        <ReviewGrid initialReviews={sampleReviews} />
      </div>
    </main>
  );
}