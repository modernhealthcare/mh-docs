## SiteCatalyst

### Configuration

<pre>
<code class="language-markup">
&lt;a class="omnitrack" data-omnilocation="header" data-omnilink="subscribe" data-omnievent="event4" href="#">Example Link&lt;/a>
</code>
</pre>

| Parameter           | Sample Value   | Description |
| ------------------- | -------------- | ----------- |
| `data-omnilocation` | `="header"`    | This parameter refers to the location on the page where the link resides. For instance, if the link that you’re setting up to track is in the footer navigation, you might add something like “footer-navigation" as the value here. This value can only contain letters, numbers, dashes, and underscores. |
| `data-omnilink`     | `="subscribe"` | This parameter refers to the custom name of the link that you assign. For instance, if there is a special “free subscription" link that you would like to track, the value would be something like “Free_Subscription_Deal" for this parameter. This value can only contain letters, numbers, dashes, and underscores. |
| `data-omnievent`    | `="event4"`    | This parameter is used to attach a pre-defined event (from Omniture) to the link. For example, if you wanted the link to record a “New Subscription Click" event when clicked, the value would be “event4". This parameter is optional. |

### Events

- event4 (new subscription click)
- event15 (search result click)
- event22 (print)
- event23 (email)
- event24 (comment)
