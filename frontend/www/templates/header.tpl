<nav class="btn-set win">
	<% _.each(getButtons(), function(button) { %>
	<button class="btn-os os-<%= button %>"></button>
	<% }); %>
</nav>

<nav class="btn-set fs-win">
	<button class="btn-os fullscreen"></button>
</nav>
<h1>Popcorn Time</h1>