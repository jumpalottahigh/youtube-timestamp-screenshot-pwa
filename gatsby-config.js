module.exports = {
  siteMetadata: {
    title: 'YouTube Timestamp Screenshot',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        /**
         * Print the list of removed selectors.
         * default: false
         **/

        rejected: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-43588334-9',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'youtube-screenshot',
        short_name: 'YT screenshot',
        start_url: '/',
        background_color: '#1960a0',
        theme_color: '#1960a0',
        display: 'minimal-ui',
        icon: 'src/images/youtube-timestamp-screenshot-icon-512.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
