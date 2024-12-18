// src/pages/Homepage.jsx
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Experience Luxury and Comfort</h2>
        <p className="text-center text-yellow-700">
          {/*//className={styles.content} */}
          Our hotel offers the best amenities and services to make your stay
          memorable. Enjoy our world-class dining, spa services, and much more.
        </p>
        <button className={styles.bookNow}>Book Now</button>
      </div>
    </div>
  );
}

export default Homepage;
