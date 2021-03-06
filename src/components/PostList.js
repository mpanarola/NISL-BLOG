import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Waypoint from "react-waypoint";
import moment from "moment";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { truncate } from "../helpers/utilities";
//import { blue100 } from "material-ui/styles/colors";

export const TRUNCATION_LIMIT = 150;

export default class PostList extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        slug: PropTypes.string,
        summary: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string
      })
    )
  };

  render() {
    const { fetchPosts, isLoading, posts } = this.props;

    return (
      <div>
        {console.log("custom posts", posts)}
        {posts.map(({ id, title, summary, date, slug, image }, index) => (
          <List key={index}>
            <Link
              to={`/posts/${id}/${slug}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <article
                  style={{ lineHeight: 1.35 }}
                  className="custom_blog_list"
                >
                  <img src={image} width="500px" height="auto" alt="Blog img" />
                  <h2 style={{ textDecoration: "underline" }}>
                    <strong>{title}</strong>
                  </h2>
                  <p>{truncate(summary, TRUNCATION_LIMIT)}&hellip;</p>
                  <div style={{ textAlign: "right" }}>
                    <time dateTime={date}>{moment(date).fromNow()}</time>
                  </div>
                </article>
              </ListItem>
            </Link>
            <Divider />
          </List>
        ))}

        {/* waypoint */}
        {!isLoading && <Waypoint onEnter={fetchPosts} />}
        <br />
        <br />

        {/* progress */}
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={80} thickness={6} />
        </div>
        <br />
      </div>
    );
  }
}
